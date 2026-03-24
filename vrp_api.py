import time
from datetime import datetime

import requests
from pydantic import BaseModel, Field

import state
from orders import generate_solvice_payload

# ==========================================
# 1. SHARED MODELS
# ==========================================


class Coordinates(BaseModel):
    latitude: float
    longitude: float


# ==========================================
# 2. VRP API REQUEST MODELS (Sending to Solvice)
# ==========================================


class Shift(BaseModel):
    start_time: datetime = Field(alias="from")
    end_time: datetime = Field(alias="to")
    start: Coordinates
    end: Coordinates


class Resource(BaseModel):
    name: str
    shifts: list[Shift]
    capacity: list[int]


class RequestJob(BaseModel):
    name: str
    location: Coordinates
    duration: int
    load: list[int]


class RoutingOptions(BaseModel):
    routing_engine: str = Field(alias="routingEngine")


class VrpRequestPayload(BaseModel):
    resources: list[Resource]
    jobs: list[RequestJob]
    options: RoutingOptions


# ==========================================
# 3. VRP API RESPONSE MODELS (Receiving from Solvice)
# ==========================================


class ResponseJob(BaseModel):
    job: str
    arrival: datetime


class Summary(BaseModel):
    total_load: int = Field(alias="totalLoad")
    total_jobs: int = Field(alias="totalJobs")


class Route(BaseModel):
    resource: str
    jobs: list[ResponseJob]
    summary: Summary


class Solution(BaseModel):
    routes: list[Route]
    unassigned: list[str] = []  # Added a default empty list just in case!


class VrpResponsePayload(BaseModel):
    solution: Solution


# ==========================================
# How to Unmarshal (Deserialize)
# ==========================================

json_payload = """
{
  "solution": {
    "routes": [
      {
        "resource": "van-1",
        "jobs": [
          { "job": "delivery-2", "arrival": "2024-03-15T07:15:00Z" },
          { "job": "delivery-3", "arrival": "2024-03-15T07:28:00Z" }
        ],
        "summary": { "totalLoad": 215, "totalJobs": 2 }
      },
      {
        "resource": "van-2",
        "jobs": [
          { "job": "delivery-1", "arrival": "2024-03-15T07:12:00Z" },
          { "job": "delivery-4", "arrival": "2024-03-15T07:25:00Z" },
          { "job": "delivery-5", "arrival": "2024-03-15T07:38:00Z" }
        ],
        "summary": { "totalLoad": 270, "totalJobs": 3 }
      }
    ],
    "unassigned": []
  }
}
"""


# parsed_data = VrpResponsePayload.model_validate_json(json_payload)
#
# print(f"First van: {parsed_data.solution.routes[0].resource}")
# print(f"Total jobs for van_2: {parsed_data.solution.routes[1].summary.total_jobs}")
# print(f"Arrival time of first job: {parsed_data.solution.routes[0].jobs[0].arrival}")


def solve_vrp() -> VrpResponsePayload | None:
    SOLVICE_SOLVE_URL = "https://api.solvice.io/v2/vrp/solve"
    SOLVICE_URL = "https://api.solvice.io/v2/vrp/jobs/"

    payload = generate_solvice_payload(state.orders, [])
    get_req_headers = {"Authorization": state.api_key}
    post_req_headers = {
        "Authorization": state.api_key,
        "Content-Type": "application/json",
    }

    parsed_data = None
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
                return

            time.sleep(1)
            attempt += 1
        else:
            print("Timeout waiting for solution")
            return

        res = requests.get(solvice_solution_url, headers=get_req_headers)
        res.raise_for_status()
        parsed_data = VrpResponsePayload.model_validate_json(res.text)

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return

    except Exception as e:
        print(f"Unexpected error: {e}")
        return

    print(f"Solvice Response: {parsed_data}")
    return parsed_data
