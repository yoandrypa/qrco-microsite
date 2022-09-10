import dynamoose from "../../libs/dynamoose";
// @ts-ignore
import { v4 } from "uuid";
import { LinkModel } from "./LinkModel";

// instantiate a dynamoose schema
const VisitSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: v4
  },
  countries: {
    type: Object
  },
  link_id: {
    type: LinkModel
  },
  referrers: {
    type: Object
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  br_chrome: {
    type: Number,
    required: true,
    default: 0
  },
  br_edge: {
    type: Number,
    required: true,
    default: 0
  },
  br_firefox: {
    type: Number,
    required: true,
    default: 0
  },
  br_ie: {
    type: Number,
    required: true,
    default: 0
  },
  br_opera: {
    type: Number,
    required: true,
    default: 0
  },
  br_other: {
    type: Number,
    required: true,
    default: 0
  },
  br_safari: {
    type: Number,
    required: true,
    default: 0
  },
  os_android: {
    type: Number,
    required: true,
    default: 0
  },
  os_ios: {
    type: Number,
    required: true,
    default: 0
  },
  os_linux: {
    type: Number,
    required: true,
    default: 0
  },
  os_macos: {
    type: Number,
    required: true,
    default: 0
  },
  os_other: {
    type: Number,
    required: true,
    default: 0
  }
}, { "timestamps": true });

// create a model from schema and export it
export const VisitModel = dynamoose.model("visits", VisitSchema);

VisitModel.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});
