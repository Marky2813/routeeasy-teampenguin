from flask import Blueprint, jsonify, request

import state
from orders import Coordinates, Order
from vrp_api import solve_vrp

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
            new_order.coordinates = Coordinates(
                latitude=order.get("coordinates")[0],
                longitude=order.get("coordinates")[1],
            )
        except ValueError as e:
            return jsonify({"error": "Validation failed", "details": str(e)}), 422

        state.orders.items.append(new_order)

    return {"message": "orders received"}, 201


@api.get("/test_route")
def test_route():
    data = solve_vrp()
    if data is None:
        return {"message": "fucked"}, 401
    else:
        return data.model_dump()
