import os
import threading
import time
from datetime import timedelta

import requests
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request, Response, stream_with_context

import state
from orders import Order, OrderStatus
from vrp_api import solve_vrp
from announcer import announce_order, update_order_status
from concurrent.futures import ThreadPoolExecutor

api = Blueprint("api", __name__)
load_dotenv()
TMB_API_KEY = os.environ.get("TMB_API_KEY")
GOOGLE_GEOCODING_API_KEY = os.environ.get("GOOGLE_GEOCODING_API_KEY")


@api.get("/health")
def health_check():
    return {"status": "ok"}


@api.get("/orders/list")
def get_orders():
    return jsonify({"Orders": state.orders.to_list()})


@api.post("/orders")
def retrieve_post():
    orders = request.get_json()["data"]

    if not orders:
        return jsonify({"error": "Missing or invalid JSON payload"}), 400

    try:
        new_orders = [Order.from_dict(order) for order in orders]
    except (KeyError, TypeError, ValueError) as e:
        return jsonify({"error": "Validation failed", "details": str(e)}), 422

    state.orders.items = new_orders

    ok = solve_vrp()
    if not ok:
        return {"message": "internal server error"}, 500
    else:
        thread = threading.Thread(target=send_mssg)
        thread.daemon = True
        thread.start()
        return jsonify(state.orders.to_list()), 200


@api.get("/rider")
def rider_provider():
    return jsonify(state.rider.to_list()), 200


@api.get("/test_route")
def test_route():
    ok = solve_vrp()
    if not ok:
        return {"message": "mayday"}, 401
    else:
        return jsonify(state.orders.to_list()), 200


@api.get("/notification/flip/<order_id>")
def flip_notification(order_id):
    for order in state.orders.items:
        if order.order_id == order_id:
            order.notification_status = 1 if order.notification_status == 0 else 0
            return {
                "message": f"Notification status flipped to {order.notification_status}"
            }
    return {"message": "Number not associated with any pending orders"}


@api.get("/solution")
def get_solution():
    if state.last_order_solvice_id is None:
        return {"message": "mayday"}, 401
    SOLVICE_EXPLAINATION_URL = (
        f"https://api.solvice.io/v2/vrp/jobs/{state.last_order_solvice_id}/explanation"
    )

    get_req_headers = {"Authorization": state.solvice_api_key}

    res = requests.get(SOLVICE_EXPLAINATION_URL, headers=get_req_headers)
    res.raise_for_status()

    return res.json(), 200


@api.post("/webhook")
def whatsapp_webhook():
    data = request.get_json()
    recipient = data.get("from")  # gives like 91XXXXXXXXXX
    order = check_order_details(receiver_phone=recipient)
    text = ""

    if order is None:
        return {"message": "Message Ignored."}

    if "reschedule" in data.get("message").lower():
        # requests.get(
        #     url=f"http://127.0.0.1:{state.port}/api/order/cancel/{order.order_id}"
        # )
        # my dumass was making internal http call instead of import the function and running it directly.
        cancel_order(order_id=order.order_id)
        # GET req. to: https://api.textmebot.com/send.php?recipient=[+91xxxxxxxxxx]&apikey=[TMB_API_KEY]&text=[TEXT]
        text = f"✅ Your request to reschedule the delivery for order ID {order.order_id} has been received and forwarded to the delivery team. \n\nPlease note: if this request is made less than 2 hours before the expected arrival time, the driver may still attempt delivery. \n\nThank you for your understanding."

        # return {"message": "Message Sent."}
    elif "confirm" in data.get("message").lower():
        text = f"✅ Your delivery for order ID {order.order_id} has been successfully confirmed.\n\n🚚 Our delivery partner will arrive as per the scheduled time.\n\nThank you for your confirmation!"

    else:
        text = "Sorry, we didn’t understand your response.\nPlease reply with:\n1️⃣ Confirm \n2️⃣ Reschedule\n\nWe’re here to help!"
    print(
        requests.get(
            url="https://api.textmebot.com/send.php",
            params={
                "recipient": f"+{recipient}",
                "apikey": TMB_API_KEY,
                "text": text,
            },
        )
    )
    return {"message": "Message sent."}


def send_mssg():
    result = []
    for order in state.orders.items:
        if order.status != OrderStatus.PENDING or order.notification_status:
            print("skipping for" + order.customer_name)
            continue
        result.append(send_message(order))
        print(result)
        # result["order_id"] = order.order_id
        order.notification_status = 1
        time.sleep(6)
    print(
        f"message: Notifications sent to all pending orders with notification consent. Count: {len(result)}. Details: {result}"
    )

    # return {"message": f"{count} messages sent.", "details": result}


def send_message(order):
    tmb_api_key = os.environ.get("TMB_API_KEY")
    if not tmb_api_key:
        return jsonify({"error": "TextMeBot API key not found"}), 500

    try:
        message_body = f"Hi {order.customer_name} 👋\n\nYour delivery is scheduled between:\n⏰ {order.get_time_window()}\nPlease reply with:\n1️⃣ Confirm \n2️⃣ Reschedule\n\nOrder ID: {order.order_id}"

        response = requests.get(
            url="https://api.textmebot.com/send.php",
            params={
                "recipient": f"+{order.phone_number}",
                "apikey": tmb_api_key,
                "text": message_body,
            },
            timeout=10,
        )
        print(f"{order.phone_number}\n" + response.text)
        return {
            "status": "Message sent",
            "api_response": response.text,
            "order_id": order.order_id,
        }

    except requests.RequestException as e:
        return {"status": "Failed", "error": str(e), "order_id": order.order_id}


def check_order_details(
    receiver_phone,
) -> Order | None:  # input should be like +91XXXXXXXXXX
    for order in state.orders.items:
        if order.phone_number[-10:] in receiver_phone:
            if order.status != OrderStatus.PENDING:
                continue  # receiver might have multiple orders, so can't simply return None on their first order, simply return all the orders with pending status? or just the first order for now.
            return order
        # We can check the current time and the arrival time also. And send message according to that to the customer.


@api.post("/geocode")
def geocode_orders():
    orders = request.json  # the whole array

    def geocode_one(order):
        address = order["deliveryAddress"].replace(" ", "+") + f",{order['pincode']}"
        res = requests.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            params={
                "address": address,
                "key": GOOGLE_GEOCODING_API_KEY,
            },
        )
        location = res.json()["results"][0]["geometry"]["location"]
        order["coordinates"] = [location["lat"], location["lng"]]
        return order

    with ThreadPoolExecutor() as executor:
        geocoded = list(executor.map(geocode_one, orders))

    return jsonify(geocoded)


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
# TODO: do we need to require api key for this endpoint too? NO, each thread cannot access this somehow? givign error
def get_cancelled_order():

    def event_stream():
        messages = announce_order.listen()
        while True:
            msg = messages.get()
            yield f"data: {msg}\n\n"

    return Response(
        stream_with_context(event_stream()),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
