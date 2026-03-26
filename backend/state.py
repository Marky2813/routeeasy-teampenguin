import os
from datetime import datetime

from dotenv import load_dotenv

from orders import Coordinates, Order, Orders, OrderStatus
from rider import Rider

load_dotenv()
port = int(os.getenv("PORT", 5000))
api_key = os.getenv("SOLVICE_API_KEY")

orders = Orders()

rider = Rider(
    name="rider-1",
    shifts=[
        {
            "from": "2024-03-15T08:00:00Z",
            "to": "2024-03-15T13:00:00Z",
            "start": {"latitude": 28.616856, "longitude": 77.29401},
        },
        {
            "from": "2024-03-15T14:00:00Z",
            "to": "2024-03-15T18:00:00Z",
            "start": {"latitude": 28.616856, "longitude": 77.29401},
        },
    ],
    capacity=[50],
)

# For testing purposes
# TEMPORARY ORDERS. In production, will added via POST req to /orders endpoint.
orders.items.extend(
    [
        Order(
            "001",
            "Shaurya Singh",
            1.2,
            "918368458315",
            "A-167 SEC-122",
            201301,
            Coordinates(28.5274118, 77.1585822),
            300,
            OrderStatus.PENDING,
            datetime(2026, 3, 26, 3, 30),
            0
        ),
        Order(
            "002",
            "Sarthak",
            1.5,
            "919871740518",
            "DELHI ME KAHI",
            110067,
            Coordinates(28.5274118, 77.1585822),
            300,
            OrderStatus.PENDING,
            datetime(2026, 3, 26, 3, 30),
            1
        ),
        Order(
            "003",
            "Akash",
            1.0,
            "917011576727",
            "DELHI ME KAHI",
            1100067,
            Coordinates(19.076090, 72.877426),
            300,
            OrderStatus.PENDING,
            datetime(2026, 3, 26, 3, 30),
            0
        )
    ]
)
