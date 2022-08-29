import dynamoose from "../libs/dynamoose";
// @ts-ignore
import { v4 } from "uuid";
//const Unique = require("./unique");
import { User } from "./user";
import { Domain } from "./domain";

// instantiate a dynamoose schema
const created_at = new Date().toISOString();
const LinkSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: v4
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: [String, dynamoose.NULL]
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  banned_by_id: {
    type: User
  },
  domain_id: {
    type: [Domain, dynamoose.NULL] //TODO Include reference to Domain
  },
  password: {
    type: [String, dynamoose.NULL]
  },
  expire_in: {
    type: [Date, dynamoose.NULL]
  },
  target: {
    type: String,
    //TODO including limit of 2040 characters
    required: true
  },
  user_id: {
    type: User
    //TODO delete in cascade if user reference is deleted
  },
  visit_count: {
    type: Number,
    required: true,
    default: 0
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
export const Link = dynamoose.model("links", LinkSchema);

Link.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});

Link.methods.set("batchDeletes", async function(conditions = undefined) {
  let results;
  if (conditions) {
    // @ts-ignore
    results = await this.scan(conditions)
      .attributes(["id"])
      .exec();
  } else {
    // @ts-ignore
    results = await this.scan()
      .attributes(["id"])
      .all();
  }
  // @ts-ignore
  return results.length > 0 ? this.batchDelete(results) : true;
});
