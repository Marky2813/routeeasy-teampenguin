import json
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


def update_order_status(order_id, status, label):
    order = state.order_map.get(order_id)
    if not order:
        return {"error": "Order not found"}, 404

    order.status = status

    msg = {order_id: label}
    announce_order.announce(json.dumps(msg))

    return msg


# announcer routes
@api.get("/order/cancel/<order_id>")
def cancel_order(order_id):
    return update_order_status(order_id, OrderStatus.CANCELLED, "cancelled")


@api.get("/order/complete/<order_id>")
def successful_order(order_id):
    return update_order_status(order_id, OrderStatus.COMPLETED, "completed")


@api.get("/order/fail/<order_id>")
def failed_order(order_id):
    return update_order_status(order_id, OrderStatus.FAILED, "failed")


@api.get("/order/get/status")
def get_cancelled_order():
    def event_stream():
        messages = announce_order.listen()
        while True:
            msg = messages.get()
            yield f"data: {msg}\n\n"

    return Response(event_stream(), mimetype="text/event-stream")
