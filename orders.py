from datetime import datetime
from enum import Enum

from vrp_api import Coordinates


class OrderStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class Order:
    order_id: int
    customer_name: str
    package_weight: int
    phone_number: str
    delivery_address: str
    pincode: int

    handshake_duration: int
    location: Coordinates
    status: OrderStatus
    arrival: datetime


class Orders:
    def __init__(self):
        self.items: list[Order] = []
