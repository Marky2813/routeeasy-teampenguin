import os
import sys
from datetime import datetime

from dotenv import load_dotenv

from orders import Coordinates, Order, Orders, OrderStatus
from rider import Rider

load_dotenv()
port = int(os.getenv("PORT", 5000))
solvice_api_key = os.getenv("SOLVICE_API_KEY")
if solvice_api_key is None:
    print("ERROR: missing SOLVICE_API_KEY")
    sys.exit()

last_order_solvice_id = None

orders = Orders()
order_map: dict[str, Order] = {}
visit_map: dict[str, dict] = {}

rider = Rider(
    name="rider-1",
    shifts=[
        {
            "from": "2026-03-26T08:00:00Z",
            "to": "2026-03-26T18:00:00Z",
            "start": {"latitude": 28.616856, "longitude": 77.29401},
            "end": {"latitude": 28.616856, "longitude": 77.29401},
            "breaks": [
                {
                    "type": "FIXED",
                    "from": "2026-03-26T12:00:00",
                    "to": "2026-03-26T12:30:00",
                    "duration": 1800,
                }
            ],
        },
    ],
    capacity=[500],
)
# rider.visits = [
#     {
#         "arrival": "2026-03-26T08:00:00Z",
#         "serviceTime": 300,
#         "status": "fuck",
#         "travelTime": 0,
#         "job": "001",
#         "location": {"latitude": 28.616856, "longitude": 77.29401},
#         "latlon": [28.616788, 77.29416],
#         "snappedLocation": {"latitude": 28.616788, "longitude": 77.29416},
#         "breakTime": 0,
#         "waitTime": 0,
#     },
#     {
#         "arrival": "2026-03-26T08:20:27Z",
#         "serviceTime": 300,
#         "travelTime": 927,
#         "distance": 12411,
#         "status": "fuck",
#         "job": "RE-10033",
#         "location": {"latitude": 28.5699034, "longitude": 77.24134529999999},
#         "latlon": [28.569925, 77.241292],
#         "snappedLocation": {"latitude": 28.569925, "longitude": 77.241292},
#         "breakTime": 0,
#         "waitTime": 0,
#     },
# ]
#
# # For testing purposes
# orders.items.extend(
#     [
#         Order(
#             "001",
#             "Shaurya Singh",
#             1.2,
#             "918368458315",
#             "A-167 SEC-122",
#             201301,
#             Coordinates(28.5274118, 77.1585822),
#             300,
#             OrderStatus.PENDING,
#             datetime(2026, 3, 26, 3, 30),
#             0,
#         ),
#         Order(
#             "002",
#             "Sarthak",
#             1.5,
#             "919871740518",
#             "DELHI ME KAHI",
#             110067,
#             Coordinates(28.5274118, 77.1585822),
#             300,
#             OrderStatus.PENDING,
#             datetime(2026, 3, 26, 3, 30),
#             1,
#         ),
#         Order(
#             "RE-10033",
#             "Akash",
#             1.0,
#             "917011576727",
#             "DELHI ME KAHI",
#             1100067,
#             Coordinates(19.076090, 72.877426),
#             300,
#             OrderStatus.PENDING,
#             datetime(2026, 3, 26, 3, 30),
#             0,
#         ),
#     ]
# )
