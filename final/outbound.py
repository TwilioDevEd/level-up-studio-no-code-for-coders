import os
from twilio.rest import Client

client = Client(
    os.environ["TWILIO_ACCOUNT_SID"],
    os.environ["TWILIO_AUTH_TOKEN"]
)

FLOW_SID = "FW23a1382b5e8619dfc2400aa78c008836"

executions = client.studio.flows(FLOW_SID).executions.list()

unique_numbers = set(ex.contact_channel_address for ex in executions)

for number in unique_numbers:
    execution = client.studio.flows(FLOW_SID).executions.create(
        to=number,
        from_="+12399324627"
    )
    print(f"Execution {execution.sid} created")

print(f"There are {len(unique_numbers)}")