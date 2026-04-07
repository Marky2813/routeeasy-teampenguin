from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

import announcer
import state
from routes import api


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api, url_prefix="/api")

    @app.get("/")
    def index():
        return {
            "service": "RouteEasy API",
            "status": "running",
            "version": "1.0",
        }

    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        return jsonify(
            {"error": e.name, "message": e.description, "status": e.code}
        ), e.code

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=state.port, debug=False)
