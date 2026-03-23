from flask import Blueprint, jsonify, request

import state
from orders import Order

api = Blueprint("api", __name__)


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
            new_order = Order(
                order_id=order.get("orderId"),
                customer_name=order.get("customerName", "Unknown"),
                package_weight=order.get("packageWeight(kg)"),
                phone_number=order.get("phoneNumber"),
                delivery_address=order.get("deliveryAddress"),
                pincode=order.get("pincode"),
            )
        except ValueError as e:
            return jsonify({"error": "Validation failed", "details": str(e)}), 422

        state.orders.items.append(new_order)

    return {"message": "orders received"}, 201
