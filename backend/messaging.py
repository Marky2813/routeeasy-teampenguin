from state import orders
from orders import OrderStatus
from datetime import datetime, timedelta
from routes import api
# datetime(2026, 3, 25, 3, 30)


@api.get("/notify/orders")
def notify_orders():
    for order in orders.items:
        try:
            if order.status != OrderStatus.PENDING or order.notification_status:
                continue
            message_body = f"Hi {order.customer_name} 👋\n\nYour delivery is scheduled between:\n⏰ {(order.arrival - timedelta(minutes=83)).strftime('%H:%M')} - {(order.arrival + timedelta(minutes=37)).strftime('%H:%M')}\nPlease reply with:\n1️⃣ Confirm \n2️⃣ Reschedule\n\nOrder ID: {order.order_id}"

        except Exception as e:
            # Step 7: Handle errors
            print(f"Failed to send message to {order.customer_name} | Error: {e}")
