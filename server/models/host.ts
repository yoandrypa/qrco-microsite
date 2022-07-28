import dynamoose from "../libs/dynamoose";
import { v4 } from "uuid";
import { User } from "./user";

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
  banned_by_id: {
    type: User //TODO Include reference to User
  },
  updated_at: {
    type: String,
    required: true,
    default: new Date().toISOString()
  }
});

// create a model from schema and export it
export const Host =
  dynamoose.model.hosts || dynamoose.model("hosts", HostSchema);

Host.methods.set("findOne", async function(criteria) {
  const results = await this.scan(criteria).exec();
  return results[0];
});
