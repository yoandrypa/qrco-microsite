import dynamoose from "../libs/dynamoose";

const { v4 } = require("uuid");
//const Unique = require("./unique")

// user schema
const UserSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: v4
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  bannedById: {
    type: dynamoose.THIS
  },
  coolDowns: {
    type: Array,
    schema: [String]
  },
  customerId: {
    type: String,
    required: false,
  },
  subscriptionData: {
    type: Object,
    required: false
  },
},{
  "saveUnknown":[
    "subscriptionData.**"
  ]
,
 "timestamps": true });

export const UserModel = dynamoose.model("users", UserSchema);

UserModel.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});
