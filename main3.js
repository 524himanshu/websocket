// Ensure AWS SDK is loaded
AWS.config.region = 'eu-north-1'; // Your AWS region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-north-1:0bef22bb-318a-4c32-a548-dee2d43a6061' // Your Identity Pool ID
});

// Ensure AWS IoT Data SDK is configured correctly
const iotData = new AWS.IotData({
    endpoint: 'a14huk2337ce7c-ats.iot.eu-north-1.amazonaws.com' // Your IoT endpoint
});

// Function to publish data
function publishMessage() {
    const params = {
        topic: 'trial',
        payload: JSON.stringify({
            name: 'Sejal', // New key-value pair
            entryTime: '2024-10-16T08:00:00Z', // New key-value pair
            exitTime: '2024-10-16T10:00:00Z', // New key-value pair
            paymentStatus: 'Paid' // New key-value pair
        }),
        qos: 0
    };

    iotData.publish(params, function (err, data) {
        if (err) {
            console.error('Error publishing:', err); // Error handling
        } else {
            console.log('Message published:', data); // Success feedback
        }
    });
}

// Call the publish function to send data
publishMessage();