from flask import Blueprint, request

api = Blueprint("api", __name__)


@api.get("/health")
def health_check():
    return {"status": "ok"}
