from datetime import datetime

from pydantic import BaseModel, Field


# innermost
class Job(BaseModel):
    job: str
    arrival: datetime  # Pydantic automatically parses ISO 8601 strings into Python datetime objects


class Summary(BaseModel):
    total_load: int = Field(alias="totalLoad")
    total_jobs: int = Field(alias="totalJobs")


class Route(BaseModel):
    resource: str
    jobs: list[Job]
    summary: Summary


class Solution(BaseModel):
    routes: list[Route]
    # unassigned: list[str]


class RoutingResponse(BaseModel):
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
          {"job": "delivery-2", "arrival": "2024-03-15T07:15:00Z"},
          {"job": "delivery-3", "arrival": "2024-03-15T07:28:00Z"}
        ],
        "summary": {"totalLoad": 215, "totalJobs": 2}
      },
      {
        "resource": "van-2",
        "jobs": [
          {"job": "delivery-1", "arrival": "2024-03-15T07:12:00Z"},
          {"job": "delivery-4", "arrival": "2024-03-15T07:25:00Z"},
          {"job": "delivery-5", "arrival": "2024-03-15T07:38:00Z"}
        ],
        "summary": {"totalLoad": 270, "totalJobs": 3}
      }
    ],
    "unassigned": []
  }
}
"""

parsed_data = RoutingResponse.model_validate_json(json_payload)

print(f"First van: {parsed_data.solution.routes[0].resource}")
print(f"Total jobs for van_2: {parsed_data.solution.routes[1].summary.total_jobs}")
print(f"Arrival time of first job: {parsed_data.solution.routes[0].jobs[0].arrival}")
# print(f"main: {parsed_data.solution}")
