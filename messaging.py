from twilio.rest import Client
from state import orders
from orders import OrderStatus
from datetime import datetime, timedelta
client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)


# datetime(2026, 3, 25, 3, 30)

# with open("users.json", "r") as file:
#     users = json.load(file)

for order in orders.items:
    try:
        # Step 4: Create message dynamically
        if order.status != OrderStatus.PENDING or order.notification_status:
            continue
        message_body = f"""
Hi {order.customer_name} 👋

Your delivery is scheduled between:
⏰ {(order.arrival - timedelta(minutes=83)).strftime("%H:%M")} - {(order.arrival + timedelta(minutes=37)).strftime("%H:%M")}

Reply:
CONFIRM ✅
RESCHEDULE 🔁

Order ID: {order.order_id}
"""
        message = client.messages.create(
            from_='whatsapp:+14155238886',  # Twilio sandbox number
            to=f"whatsapp:+{order.phone_number}",
            body=message_body
        )
        print(f"Message sent to {order.customer_name} | SID: {message.sid}")

    except Exception as e:
        # Step 7: Handle errors
        print(f"Failed to send message to {order.customer_name} | Error: {e}")

