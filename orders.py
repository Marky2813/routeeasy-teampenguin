from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class OrderStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


@dataclass
class Coordinates:
    latitude: float
    longitude: float


@dataclass
class Order:
    order_id: str
    customer_name: str
    package_weight: float
    phone_number: str
    delivery_address: str
    pincode: int
    coordinates: Coordinates
    handshake_duration: Optional[int] = 300
    status: Optional[OrderStatus] = OrderStatus.PENDING
    arrival: Optional[datetime] = None


class Orders:
    def __init__(self):
        self.items: list[Order] = []


def generate_solvice_payload(orders: Orders, resources: list) -> dict:
    jobs = []

    for order in orders.items:
        if not order.coordinates:
            print(f"Skipping order {order.order_id}: Missing coordinates.")
            continue

        if order.status != OrderStatus.PENDING:
            continue

        job = {
            "name": order.order_id,
            "location": {
                "latitude": order.coordinates.latitude,
                "longitude": order.coordinates.longitude,
            },
            "duration": order.handshake_duration,
            "load": [order.package_weight],
        }
        jobs.append(job)

    # for now
    resources = [
        {
            "name": "courier-1",
            "shifts": [
                {
                    "from": "2024-03-15T08:00:00Z",
                    "to": "2024-03-15T18:00:00Z",
                    "start": {"latitude": 28.616856, "longitude": 77.29401},
                    "end": {"latitude": 28.616856, "longitude": 77.29401},
                }
            ],
            "capacity": [50],
        }
    ]

    # final payload
    payload = {
        "resources": resources,
        "jobs": jobs,
        "options": {"routingEngine": "OSM"},
    }

    return payload
