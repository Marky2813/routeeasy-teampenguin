import pytest
from app import app as flask_app


@pytest.fixture
def client():
    flask_app.config["TESTING"] = True
    with flask_app.test_client() as c:
        yield c


def test_health(client):
    assert client.get("/api/health").status_code == 200


def test_orders_require_api_key(client):
    assert client.post("/api/orders", json=[]).status_code == 401


def test_notify_requires_api_key(client):
    assert client.get("/api/notify/orders").status_code == 401
