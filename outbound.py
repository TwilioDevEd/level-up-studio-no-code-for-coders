import os
from twilio.rest import Client

client = Client(
    os.environ["TWILIO_ACCOUNT_SID"],
    os.environ["TWILIO_AUTH_TOKEN"]
)

FLOW_SID = "FWb670ea9861791e8eee7cac7de9904180"
executions = client.studio.flows(FLOW_SID).executions.list()

unique_numbers = set(ex.contact_channel_address for ex in executions)

for number in unique_numbers:
    ex = client.studio.flows(FLOW_SID).executions.create(
        to=number,
        from_="+15858662633"
    )
    print(f"Created a new call {ex.sid}")