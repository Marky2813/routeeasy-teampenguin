from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import Enum
from typing import List, Optional

import state


class OrderStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


@dataclass
class Coordinates:
    latitude: float
    longitude: float

    @staticmethod
    def from_list(coords: list[float]) -> "Coordinates":
        return Coordinates(latitude=coords[0], longitude=coords[1])

    def to_dict(self) -> list[float]:
        return [self.latitude, self.longitude]


def round_up_to_5(dt):
    if dt.minute % 5 == 0:
        return dt
    return (
        dt
        + timedelta(minutes=(5 - dt.minute % 5))
        - timedelta(seconds=dt.second, microseconds=dt.microsecond)
    )


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
    notification_status: int = 1  # 0: notification not sent yet, 1: notification sent

    @staticmethod
    def from_dict(data: dict) -> "Order":
        try:
            return Order(
                order_id=data["orderId"],
                customer_name=data["customerName"],
                phone_number=data["phoneNumber"],
                delivery_address=data["deliveryAddress"],
                pincode=data["pincode"],
                package_weight=data["packageWeight"],
                coordinates=Coordinates.from_list(data["coordinates"]),
            )
        except KeyError as e:
            raise ValueError(f"Missing required field: {e}")

    def to_dict(self) -> dict:
        return {
            "orderId": self.order_id,
            "customerName": self.customer_name,
            "phoneNumber": self.phone_number,
            "deliveryAddress": self.delivery_address,
            "pincode": self.pincode,
            "packageWeight": self.package_weight,
            "coordinates": self.coordinates.to_dict(),
            "status": self.status.value if self.status else None,
            "handshakeDuration": self.handshake_duration,
            "arrival": self.arrival.isoformat() if self.arrival else None,
            "timeWindow": self.get_time_window(),
            "NotificationStatus": self.notification_status,
        }

    def get_time_window(self) -> Optional[str]:
        if not self.arrival:
            return None
        rounded_arrival = round_up_to_5(self.arrival)
        start = rounded_arrival - timedelta(hours=1)
        end = rounded_arrival + timedelta(hours=1)

        return f"{start.strftime('%I:%M %p').lstrip('0')} to {end.strftime('%I:%M %p').lstrip('0')}"


class Orders:
    def __init__(self):
        self.items: list[Order] = []

    def add_many(self, orders: List[Order]):
        self.items.extend(orders)

    def to_list(self) -> list[dict]:
        return [order.to_dict() for order in self.items]


def generate_solvice_payload(orders: Orders) -> dict:
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

    resources = [
        {
            "name": state.rider.name,
            "shifts": state.rider.shifts,
            "capacity": state.rider.capacity,
        }
    ]

    # final payload
    payload = {
        "resources": resources,
        "jobs": jobs,
        "options": {"routingEngine": "OSM"},
    }

    return payload
