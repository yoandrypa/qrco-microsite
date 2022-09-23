import dynamoose from "../../libs/dynamoose";
//const Unique = require("./unique");
import { UserModel } from "../UserModel";
import { DomainModel } from "./DomainModel";
import { getUuid } from "../../helpers/qr/helpers";

// instantiate a dynamoose schema
const LinkSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: getUuid()
  },
  type: {
    type: String,
    enum: ["short_link", "qr_link", "download_link"],
    default: "short_link"
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
  bannedById: {
    type: UserModel
  },
  domainId: {
    type: [DomainModel, dynamoose.NULL]
  },
  password: {
    type: [String, dynamoose.NULL]
  },
  expireIn: {
    type: [Date, dynamoose.NULL]
  },
  target: {
    type: String,
    //TODO including limit of 2040 characters
    required: true
  },
  userId: {
    type: UserModel
    //TODO delete in cascade if user reference is deleted
  },
  visitCount: {
    type: Number,
    required: true,
    default: 0
  }
}, { "timestamps": true });

// create a model from schema and export it
export const LinkModel = dynamoose.model("links", LinkSchema);

LinkModel.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});

LinkModel.methods.set("batchDeletes", async function(conditions = undefined) {
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
