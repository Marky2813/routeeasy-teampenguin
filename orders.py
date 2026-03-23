from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional

from vrp_api import Coordinates


class OrderStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


@dataclass
class Order:
    order_id: int
    customer_name: str
    package_weight: int
    phone_number: str
    delivery_address: str
    pincode: int

    handshake_duration: Optional[int] = None
    location: Optional[Coordinates] = None
    status: Optional[OrderStatus] = None
    arrival: Optional[datetime] = None


class Orders:
    def __init__(self):
        self.items: list[Order] = []
