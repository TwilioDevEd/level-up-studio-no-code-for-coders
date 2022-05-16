import os
from twilio.rest import Client

client = Client(
    os.environ["TWILIO_ACCOUNT_SID"],
    os.environ["TWILIO_AUTH_TOKEN"]
)
FLOW_SID = "FW02d4b50ab74d1ebedebb6d6bc5fa5756"
executions = client.studio.flows(FLOW_SID).executions.list()

unique_numbers = set(ex.contact_channel_address for ex in executions)

for number in unique_numbers:
    execution = client.studio.flows(FLOW_SID).executions.create(
        to=number,
        from_="+15855662633"
    )
    print(f"Execution {execution.sid} created")
print(f"There were {len(executions)} executions")