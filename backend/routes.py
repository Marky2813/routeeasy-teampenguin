import os

import requests
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request

import state
from orders import Order, OrderStatus
from vrp_api import solve_vrp
import time 
from datetime import timedelta

api = Blueprint("api", __name__)

load_dotenv()
TMB_API_KEY = os.getenv("TMB_API_KEY")


@api.get("/health")
def health_check():
    return {"status": "ok"}


@api.post("/orders")
def retrieve_post():
    orders = request.get_json()

    if not orders:
        return jsonify({"error": "Missing or invalid JSON payload"}), 400

    try:
        new_orders = [Order.from_dict(order) for order in orders]
    except (KeyError, TypeError, ValueError) as e:
        return jsonify({"error": "Validation failed", "details": str(e)}), 422

    state.orders.items.extend(new_orders)

    # return jsonify({"message": "Orders added successfully"}), 200
    ok = solve_vrp()
    if not ok:
        return {"message": "internal server error"}, 500
    else:
        return jsonify(state.orders.to_list()), 200


@api.get("/test_route")
def test_route():
    ok = solve_vrp()
    if not ok:
        return {"message": "mayday"}, 401
    else:
        return jsonify(state.orders.to_list()), 200


@api.get("/order/success/<order_id>")
def successful_order(order_id):
    for order in state.orders.items:
        if order.order_id == order_id:
            order.status = OrderStatus.COMPLETED
    return order_id


@api.get("/order/fail/<order_id>")
def failed_order(order_id):
    for order in state.orders.items:
        if order.order_id == order_id:
            order.status = OrderStatus.FAILED
    return order_id


@api.post("/webhook")
def whatsapp_webhook():
    data = request.get_json()
    recipient = data.get("from")  # gives like 91XXXXXXXXXX
    order = check_order_details(receiver_phone=recipient)
    text = ""
    if order is None:
        return {"message": "Message Ignored."}

    if data.get("message").lower() == "reschedule":
        requests.get(
            url=f"http://127.0.0.1:{state.port}/api/order/cancel/{order.order_id}"
        )
        # GET req. to: https://api.textmebot.com/send.php?recipient=[+91xxxxxxxxxx]&apikey=[TMB_API_KEY]&text=[TEXT]
        text = f"✅ Your request to reschedule the delivery for order ID {order.order_id} has been received and forwarded to the delivery team. \n\nPlease note: if this request is made less than 2 hours before the expected arrival time, the driver may still attempt delivery. \n\nThank you for your understanding."
        # return {"message": "Message Sent."}
    elif data.get("message").lower() == "confirm":
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
    return {"message": "Message Ignored."}


@api.get("/send_mssg")
def send_mssg():
    count = 0
    result = []
    for order in state.orders.items:
        if order.status != OrderStatus.PENDING or order.notification_status:
            continue
        result.append(send_message(order))
        # result["order_id"] = order.order_id
        order.notification_status = 1
        count += 1
        time.sleep(5)

    return {"message": f"{count} messages sent.", "details": result}


def send_message(order):
    tmb_api_key = os.getenv("TMB_API_KEY")
    if not tmb_api_key:
        return jsonify({"error": "TextMeBot API key not found"}), 500

    try:
        message_body = f"Hi {order.customer_name} 👋 \n\nYour delivery is scheduled between: ⏰ {(order.arrival - timedelta(minutes=83)).strftime('%H:%M')} - {(order.arrival + timedelta(minutes=37)).strftime('%H:%M')}\n\nReply: \nCONFIRM ✅ \nRESCHEDULE 🔁 \nOrder ID: {order.order_id}"

        response = requests.get(
            url="https://api.textmebot.com/send.php",
            params={"recipient": f"+{order.phone_number}", "apikey": tmb_api_key, "text": message_body},
            timeout=10
        )
        return {"status": "Message sent", "api_response": response.text, "order_id": order.order_id}
        
    except requests.RequestException as e:
        return {"status": "Failed", "error": str(e), "order_id": order.order_id}
    
def check_order_details(
    receiver_phone,
) -> Order | None:  # input should be like +91XXXXXXXXXX
    for order in state.orders.items:
        if receiver_phone in order.phone_number:
            if order.status != OrderStatus.PENDING:
                continue  # receiver might have multiple orders, so can't simply return None on their first order, simply return all the orders with pending status? or just the first order for now.
            return order
        # We can check the current time and the arrival time also. And send message according to that to the customer.
