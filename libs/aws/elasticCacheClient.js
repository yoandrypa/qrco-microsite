import {ElastiCacheClient} from "@aws-sdk/client-elasticache";

const region = process.env.REACT_AWS_REGION;
const accessKeyId = process.env.REACT_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_AWS_SECRET_ACCESS_KEY;

export const elastiCacheClient = new ElastiCacheClient({region, credentials: {accessKeyId, secretAccessKey}});
