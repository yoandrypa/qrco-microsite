import dynamoose from "../../libs/dynamoose";
// @ts-ignore
import { v4 } from "uuid";
import { UserModel } from "../UserModel";

// instantiate a dynamoose schema
const HostSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: v4
  },
  address: {
    type: String,
    required: true
    //TODO most be Unique
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  bannedById: {
    type: UserModel //TODO Include reference to User
  }
}, { "timestamps": true });

// create a model from schema and export it
export const HostModel = dynamoose.model("hosts", HostSchema);

HostModel.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});
