import os
from functools import wraps
from flask import request, jsonify

ADMIN_API_KEY = os.environ.get("ADMIN_API_KEY")


def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        key = request.headers.get("X-API-Key") or request.args.get("api_key")
        if key != ADMIN_API_KEY:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)

    return decorated
