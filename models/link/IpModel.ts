import dynamoose from "../../libs/dynamoose";
import {getUuid} from "../../helpers/qr/helpers";

// instantiate a dynamoose schema
const IpSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: getUuid()
  },
  ip: {
    type: String,
    //TODO unique
    required: true
  }
}, { "timestamps": true });

// create a model from schema and export it
export const IpModel = dynamoose.model("ips", IpSchema);

IpModel.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});

IpModel.methods.set("batchDeletes", async function(conditions = undefined) {
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
