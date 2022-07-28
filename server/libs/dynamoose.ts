const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

if (process.env.AWS_DYNAMODB_URL) {
  dynamoose.aws.ddb.local(process.env.AWS_DYNAMODB_URL);
}
dynamoose.model.defaults.set({
  create: true,
  throughput: {
    read: 5,
    write: 5
  },
  prefix: process.env.NODE_ENV === "production" ? "prd_" : "dev_",
  suffix: "",
  waitForActive: process.env.NODE_ENV !== "production",
  update: true,
  populate: false,
  expires: undefined
});

export default dynamoose;
