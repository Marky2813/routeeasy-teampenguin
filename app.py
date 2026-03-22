import os

from dotenv import load_dotenv
from flask import Flask

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
    load_dotenv()

    port = int(os.getenv("PORT", 5000))
    api_key = os.getenv("API_KEY")

    app.run(host="0.0.0.0", port=port, debug=True)
