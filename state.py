import os

from dotenv import load_dotenv

from orders import Orders

load_dotenv()
port = int(os.getenv("PORT", 5000))
api_key = os.getenv("API_KEY")

orders = Orders()
