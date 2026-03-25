import os

from dotenv import load_dotenv

from orders import Orders, Order

load_dotenv()
port = int(os.getenv("PORT", 5000))
api_key = os.getenv("API_KEY")

orders = Orders()

# For testing purposes
orders.items.append(
    Order("01", "Shaurya", 112, "+918368458315", "A-167 sector-122", 201031)
)
