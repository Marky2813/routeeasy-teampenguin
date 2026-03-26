import time
from datetime import datetime

import requests

import state
from orders import generate_solvice_payload


def solve_vrp() -> bool:
    SOLVICE_SOLVE_URL = "https://api.solvice.io/v2/vrp/solve"
    SOLVICE_URL = "https://api.solvice.io/v2/vrp/jobs/"

    payload = generate_solvice_payload(state.orders)

    get_req_headers = {"Authorization": state.api_key}
    post_req_headers = {
        "Authorization": state.api_key,
        "Content-Type": "application/json",
    }

    try:
        res = requests.post(SOLVICE_SOLVE_URL, json=payload, headers=post_req_headers)
        res.raise_for_status()

        solvice_id = res.json().get("id")
        solvice_status_url = SOLVICE_URL + solvice_id + "/status"
        solvice_solution_url = SOLVICE_URL + solvice_id + "/solution"

        max_attempt = 100
        attempt = 0
        while attempt < max_attempt:
            res = requests.get(solvice_status_url, headers=get_req_headers)
            res.raise_for_status()

            status = res.json().get("status")
            if status == "SOLVED":
                break
            elif status in ("FAILED", "ERROR", "CANCELLED"):
                print(f"Solver failed with status: {status}")
                return False

            time.sleep(1)
            attempt += 1
        else:
            print("Timeout waiting for solution")
            return False

        res = requests.get(solvice_solution_url, headers=get_req_headers)
        res.raise_for_status()

        optimal_route = res.json()

        order_map = {order.order_id: order for order in state.orders.items}
        visits = optimal_route["trips"][0]["visits"]

        for visit in visits:
            order = order_map.get(visit["job"])
            if order:
                order.arrival = datetime.fromisoformat(
                    visit["arrival"].replace("Z", "+00:00")
                )
                visit["customer_name"] = order.customer_name
                visit["delivery_address"] = order.delivery_address
        state.rider.visits = visits

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return False

    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

    return True
