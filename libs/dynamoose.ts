import * as dynamoose from "dynamoose";

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.REACT_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_AWS_REGION
});

if (process.env.REACT_REACT_AWS_DYNAMODB_URL) {
  dynamoose.aws.ddb.local(process.env.REACT_AWS_DYNAMODB_URL);
}
dynamoose.model.defaults.set({
  create: true,
  throughput: {
    read: 5,
    write: 5
  },
  prefix: process.env.REACT_NODE_ENV === "production" ? "prd_" : "dev_",
  suffix: "",
  waitForActive: process.env.REACT_NODE_ENV !== "production",
  update: true,
  populate: false,
  expires: undefined
});

export default dynamoose;
