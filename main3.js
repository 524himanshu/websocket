// Import the AWS SDK v3 modules
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const {
  IoTDataPlaneClient,
  PublishCommand,
} = require("@aws-sdk/client-iot-data-plane");

// Configure AWS SDK
const region = "eu-north-1"; // Your AWS region
const identityPoolId = "eu-north-1:0bef22bb-318a-4c32-a548-dee2d43a6061"; // Your Identity Pool
const endpoint = "https://a14huk2337ce7c-ats.iot.eu-north-1.amazonaws.com"; // Your IoT endpoint with protocol

const iotDataClient = new IoTDataPlaneClient({
  region,
  endpoint,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region }),
    identityPoolId,
  }),
});

// Function to publish data
async function publishMessage() {
  const params = {
    topic: "trial",
    payload: JSON.stringify({
      name: "Sejal", // New key-value pair
      entryTime: "2024-10-16T08:00:00Z", // New key-value pair
      exitTime: "2024-10-16T10:00:00Z", // New key-value pair
      paymentStatus: "Paid", // New key-value pair
    }),
    qos: 0,
  };

  try {
    const data = await iotDataClient.send(new PublishCommand(params));
    console.log("Message published:", data); // Success feedback
  } catch (err) {
    console.error("Error publishing:", err); // Error handling
  }
}

// Call the publish function to send data
publishMessage();
