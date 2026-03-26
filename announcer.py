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
    for order in state.orders.items:
        if order.order_id == order_id:
            order.status = OrderStatus.CANCELLED
    announce_order.announce(order_id)
    return order_id


@api.get("/order/get/cancelled/")
def get_cancelled_order():
    def event_stream():
        messages = announce_order.listen()
        while True:
            msg = messages.get()
            yield f"data: {msg}\n\n"

    return Response(event_stream(), mimetype="text/event-stream")
