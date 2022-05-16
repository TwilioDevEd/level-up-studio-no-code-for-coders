const Twilio = require("twilio");

// Using env vars in .envrc
const client = new Twilio();

let shouldExecute = false;

if (process.argv.length > 2 && process.argv[2].includes("x")) {
  console.log(`This is not a drill, actually executing...`);
  shouldExecute = true;
} else {
  console.warn("This is a dry run, pass the parameter `-x` to execute...");
}
const NUMBERS_TO_KEEP = process.env.NUMBERS_TO_KEEP.split(",");
const SERVERLESS_SERVICES_TO_KEEP = process.env.SERVERLESS_SERVICES_TO_KEEP.split(",");

async function cleanup() {
  // Delete Numbers
  const numbers = await client.incomingPhoneNumbers.list();
  numbers
    .filter((number) => !NUMBERS_TO_KEEP.includes(number.phoneNumber))
    .forEach((number) => {
      console.log(`Deleting number ${number.phoneNumber}`);
      if (shouldExecute) {
        number.remove();
      }
    });

  // Delete Messaging Services
  const msgServices = await client.messaging.v1.services.list();
  msgServices
    .forEach((service) => {
      console.log(`Removing Messaging Service: ${service.friendlyName}`);
      if (shouldExecute) {
        service.remove();
      }
    });


  // Delete Serverless Services
  
  const services = await client.serverless.services.list();
  services
    .filter((service) => !SERVERLESS_SERVICES_TO_KEEP.includes(service.friendlyName))
    .forEach((service) => {
    console.log(`Removing Serverless Service: ${service.friendlyName}`);
    if (shouldExecute) {
      service.remove();
    }
  });
  // Delete Flows
  const flows = await client.studio.v1.flows.list();
  flows.forEach((flow) => {
    console.log(`Deleting flow: ${flow.friendlyName}`);
    if (shouldExecute) {
      flow.remove();
    }
  });
  console.log(
    "You need to go delete your TwiML Bins manually: https://www.twilio.com/console/twiml-bins"
  );
}

cleanup()
  .then(() => "DONE")
  .catch((err) => console.error(err));
