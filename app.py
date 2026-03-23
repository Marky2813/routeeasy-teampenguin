from flask import Flask

import state
from routes import api


def create_app():
    app = Flask(__name__)
    app.register_blueprint(api, url_prefix="/api")

    @app.get("/")
    def index():
        return {
            "service": "RouteEasy API",
            "status": "running",
            "version": "1.0",
        }

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=state.port, debug=True)
