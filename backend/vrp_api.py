import time
from datetime import datetime
from typing import List

import requests
from pydantic import BaseModel, Field

import state
from orders import generate_solvice_payload


class Coordinates(BaseModel):
    latitude: float
    longitude: float


class ResponseJob(BaseModel):
    job: str
    arrival: datetime


class Trip(BaseModel):
    resource: str
    visits: List[ResponseJob] = Field(alias="visits")

    distance: float
    travel_time: int = Field(alias="travelTime")
    work_time: int = Field(alias="workTime")
    service_time: int = Field(alias="serviceTime")


class VrpResponsePayload(BaseModel):
    trips: List[Trip]
    unserved: List[str] = []
    status: str
    total_travel_distance: float = Field(alias="totalTravelDistanceInMeters")
    total_travel_time: int = Field(alias="totalTravelTimeInSeconds")

    class Config:
        populate_by_name = True


def solve_vrp() -> bool:
    SOLVICE_SOLVE_URL = "https://api.solvice.io/v2/vrp/solve"
    SOLVICE_URL = "https://api.solvice.io/v2/vrp/jobs/"

    payload = generate_solvice_payload(state.orders)

    get_req_headers = {"Authorization": state.api_key}
    post_req_headers = {
        "Authorization": state.api_key,
        "Content-Type": "application/json",
    }

    optimal_route = None
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
        optimal_route = VrpResponsePayload.model_validate_json(res.text)

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return False

    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

    for visit in optimal_route.trips[0].visits:
        for order in state.orders.items:
            if order.order_id == visit.job:
                order.arrival = visit.arrival

    return True
