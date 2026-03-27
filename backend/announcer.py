import queue

from flask import Response

import state
from orders import OrderStatus
from routes import api


class MessageAnnouncer:
    def __init__(self):
        self.listeners = []

    def listen(self):
        q = queue.Queue(maxsize=5)
        self.listeners.append(q)
        return q

    def announce(self, msg):
        for i in reversed(range(len(self.listeners))):
            try:
                self.listeners[i].put_nowait(msg)
            except queue.Full:
                del self.listeners[i]


announce_order = MessageAnnouncer()


# announcer routes
@api.get("/order/cancel/<order_id>")
def cancel_order(order_id):
    order_map = {visit["job"]: visit for visit in state.rider.visits}
    for order in state.orders.items:
        visit = order_map.get(order.order_id)
        if visit is not None and order.order_id == order_id:
            order.status = OrderStatus.CANCELLED
            visit["status"] = order.status
    msg = {order_id: "cancelled"}
    announce_order.announce(msg)
    return msg


@api.get("/order/success/<order_id>")
def successful_order(order_id):
    order_map = {visit["job"]: visit for visit in state.rider.visits}
    for order in state.orders.items:
        visit = order_map.get(order.order_id)
        if visit is not None and order.order_id == order_id:
            order.status = OrderStatus.COMPLETED
            visit["status"] = order.status
    msg = {order_id: "completed"}
    announce_order.announce(msg)
    return msg


@api.get("/order/fail/<order_id>")
def failed_order(order_id):
    order_map = {visit["job"]: visit for visit in state.rider.visits}
    for order in state.orders.items:
        visit = order_map.get(order.order_id)
        if visit is not None and order.order_id == order_id:
            order.status = OrderStatus.FAILED
            visit["status"] = order.status
    msg = {order_id: "failed"}
    announce_order.announce(msg)
    return msg


@api.get("/order/get/status")
def get_cancelled_order():
    def event_stream():
        messages = announce_order.listen()
        while True:
            msg = messages.get()
            yield f"data: {msg}\n\n"

    return Response(event_stream(), mimetype="text/event-stream")
