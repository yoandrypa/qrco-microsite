import dynamoose from "../libs/dynamoose";
import { v4 } from "uuid";

// instantiate a dynamoose schema
const created_at = new Date().toISOString();
const IpSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: v4
  },
  ip: {
    type: String,
    //TODO unique
    required: true
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
export const Ip = dynamoose.model.ips || dynamoose.model("ips", IpSchema);

Ip.methods.set("findOne", async function(criteria) {
  const results = await this.scan(criteria).exec();
  return results[0];
});

Ip.methods.set("batchDeletes", async function(conditions = null) {
  let results;
  if (conditions) {
    results = await this.scan(conditions)
      .attributes(["id"])
      .exec();
  } else {
    results = await this.scan()
      .attributes(["id"])
      .all();
  }
  return results.length > 0 ? this.batchDelete(results) : true;
});
