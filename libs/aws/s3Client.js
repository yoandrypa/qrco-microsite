import { S3 } from "@aws-sdk/client-s3";

const region = process.env.REACT_AWS_REGION;
const accessKeyId = process.env.REACT_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_AWS_SECRET_ACCESS_KEY;

export const s3Client = new S3({ region, credentials: { accessKeyId, secretAccessKey } });
