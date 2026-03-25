import os

import requests
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request

import state
from orders import Coordinates, Order, OrderStatus
from vrp_api import solve_vrp

api = Blueprint("api", __name__)

load_dotenv()


@api.get("/health")
def health_check():
    return {"status": "ok"}


@api.post("/orders")
def retrive_post():
    orders = request.get_json()

    if not orders:
        return jsonify({"error": "Missing or invalid JSON payload"}), 400

    for order in orders:
        try:
            coo = Coordinates(
                latitude=order.get("coordinates")[0],
                longitude=order.get("coordinates")[1],
            )
            new_order = Order(
                order_id=order.get("orderId"),
                customer_name=order.get("customerName", "Unknown"),
                package_weight=order.get("packageWeight(kg)"),
                phone_number=order.get("phoneNumber"),
                delivery_address=order.get("deliveryAddress"),
                pincode=order.get("pincode"),
                coordinates=coo,
            )
        except ValueError as e:
            return jsonify({"error": "Validation failed", "details": str(e)}), 422

        state.orders.items.append(new_order)

    slots = solve_vrp()
    if slots is None:
        return {"message": "internal server error"}, 500
    else:
        return slots, 201


@api.get("/test_route")
def test_route():
    data = solve_vrp()
    if data is None:
        return {"message": "fucked"}, 401
    else:
        return data


@api.post("/webhook")
def webhook():
    data = request.get_json()
    recipient = data.get("from")  # gives like 91XXXXXXXXXX
    order = check_order_details(receiver_phone=recipient)
    if order is None:
        return {"message": "Message Ignored."}
    if data.get("message").lower() == "na":
        # GET req. to: https://api.textmebot.com/send.php?recipient=[+91xxxxxxxxxx]&apikey=[TMB_API_KEY]&text=[TEXT]
        tmb_api_key = os.getenv("TMB_API_KEY")
        text = f"Your request to reschedule the delivery for order ID {order.order_id} has been received and forwarded to the delivery team. \n\nPlease note: if this request is made less than 4 hours before the expected arrival time, the driver may still attempt delivery today. \n\nThank you for your understanding."
        print(
            requests.get(
                url="https://api.textmebot.com/send.php",
                params={
                    "recipient": f"+{recipient}",
                    "apikey": tmb_api_key,
                    "text": text,
                },
            )
        )
        return {"message": "Message Sent."}
    return {"message": "Message Ignored."}


def check_order_details(receiver_phone) -> Order:  # input should be like +91XXXXXXXXXX
    for order in state.orders.items:
        if receiver_phone in order.phone_number:
            if order.status != OrderStatus.PENDING:
                continue  # receiver might have multiple orders, so can't simply return None on their first order, simply return all the orders with pending status? or just the first order for now.
            return order
        # We can check the current time and the arrival time also. And send message according to that to the customer.
