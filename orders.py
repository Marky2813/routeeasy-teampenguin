from datetime import datetime
from enum import Enum
from parser import Coordinates


class OrderStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


class Order:
    order_id: int
    handshake_duration: int
    # name: str
    load: int
    contact: int
    text_address: str
    location: Coordinates
    status: OrderStatus
    arrival: datetime


class Orders:
    items: list[Order]
