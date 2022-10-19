// Create the DynamoDB service client module using ES6 syntax.
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = process.env.REACT_AWS_REGION; // For example, "us-east-1".
const CREDENTIALS = {
    accessKeyId: <string>process.env.REACT_AWS_ACCESS_KEY_ID,
    secretAccessKey: <string>process.env.REACT_AWS_SECRET_ACCESS_KEYLL
}
const ENDPOINT = process.env.REACT_AWS_DYNAMODB_URL
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({
    region: REGION,
    //credentials: CREDENTIALS,
    apiVersion: "2012-08-10",
    endpoint: ENDPOINT
});

