from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from state import orders
from orders import Coordinates, Order, OrderStatus
app = Flask(__name__)

'''
@app.route(...)
this is called Route = URL path where your server listens


http://your-server/webhook
Twilio will send data to this URL

What is request?
Represents the incoming HTTP request
Contains all data sent by Twilio
'''
@app.route("/")
@app.route("/")
def home():
    return "Home works"

@app.route("/webhook", methods=["POST"])
def whatsapp_webhook():

    incoming_msg = request.values.get("Body")
    sender = request.values.get("From")
    # whatsapp:+918368458315 this is from value.
    '''
    incoming_msg → what user typed  
    sender → user’s WhatsApp number 
    '''
    order = check_order_details(sender[10:])


    print(f"Message from {sender}: {incoming_msg}") # for debugging
    if order is None:
        return {"message": "Message Ignored."}
    response = MessagingResponse()

    if incoming_msg.lower() == "reschedule":
        mssg = f"""🔄 Your delivery for order ID {order.order_id} has been successfully rescheduled.
🚚 Our delivery team will reach you at the updated time.
Thank you for your patience and cooperation!"""
        order.status = OrderStatus.CANCELLED

    elif incoming_msg.lower() in ['confirm', 'yes', 'ok']:
        mssg = f"""✅ Your delivery for order ID {order.order_id} has been successfully confirmed.
🚚 Our delivery partner will arrive as per the scheduled time.
Thank you for your confirmation!"""

    else:
        mssg = """❗ Sorry, we didn’t understand your response.

Please reply with:
1️⃣ Confirm 
2️⃣ Reschedule 

We’re here to help!"""
    response.message(mssg)
    return str(response)


def check_order_details(receiver_phone):  # input should be like 91XXXXXXXXXX
    for order in orders.items:
        if receiver_phone in order.phone_number:
            if order.status != OrderStatus.PENDING:
                continue  # receiver might have multiple orders, so can't simply return None on their first order, simply return all the orders with pending status? or just the first order for now.
            return order
        # We can check the current time and the arrival time also. And send message according to that to the customer.


if __name__ == "__main__":
    app.run(debug=True, port=5000)

