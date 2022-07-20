const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
  "region": process.env.AWS_REGION
});

dynamoose.model.defaults.set({
  "create": process.env.NODE_ENV !== 'production',
  "throughput": {
    "read": 5,
    "write": 5
  },
  "prefix": process.env.NODE_ENV === 'production' ? "PRD_" : "DEV_",
  "suffix": "",
  "waitForActive": process.env.NODE_ENV !== 'production',
  "update": true,
  "populate": false,
  "expires": undefined
})

module.exports = dynamoose
