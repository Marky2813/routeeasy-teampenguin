import os
import sys

from dotenv import load_dotenv

from orders import Order, Orders, Rider

load_dotenv()
port = int(os.environ.get("PORT", 5000))
solvice_api_key = os.environ.get("SOLVICE_API_KEY")
if solvice_api_key is None:
    print("ERROR: missing SOLVICE_API_KEY")
    sys.exit()

last_order_solvice_id = None

orders = Orders()
order_map: dict[str, Order] = {}

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
