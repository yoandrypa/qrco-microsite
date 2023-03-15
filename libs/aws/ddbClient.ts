// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = process.env.REACT_AWS_REGION; // For example, "us-east-1".
const CREDENTIALS = {
  accessKeyId: <string>process.env.REACT_AWS_ACCESS_KEY_ID,
  secretAccessKey: <string>process.env.REACT_AWS_SECRET_ACCESS_KEY
}
const configuration = {
  region: REGION,
  credentials: CREDENTIALS,
  apiVersion: "2012-08-10"
}

if (process.env.REACT_AWS_DYNAMODB_URL) {
  // @ts-ignore
  configuration["endpoint"] = <string>process.env.REACT_AWS_DYNAMODB_URL
}

// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient(configuration);

export const tableName = (name: string): string => {
  const prefix = process.env.NODE_ENV === 'production' ? 'prd' : 'dev';

  return `${prefix}_${name}`;
}

