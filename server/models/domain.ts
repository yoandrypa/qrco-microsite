import dynamoose from "../libs/dynamoose";
import { v4 } from "uuid";
import { User } from "./user";

// instantiate a dynamoose schema
const created_at = new Date().toISOString();
const DomainSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: v4
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  banned_by_id: {
    type: User //TODO Include reference to User
  },
  address: {
    type: String,
    required: true
    //TODO Unique
  },
  homepage: {
    type: [String, dynamoose.NULL]
  },
  user_id: {
    type: User //TODO Include reference to User
    //TODO delete in cascade if user reference is deleted
  },
  created_at: {
    type: String,
    required: true,
    default: created_at
  },
  updated_at: {
    type: String,
    required: true,
    default: created_at
  }
});

// create a model from schema and export it
export const Domain =
  dynamoose.model.domains || dynamoose.model("domains", DomainSchema);

Domain.methods.set("findOne", async function(criteria) {
  const results = await this.scan(criteria).exec();
  return results[0];
});
