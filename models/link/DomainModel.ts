import dynamoose from "../../libs/dynamoose";
import { UserModel } from "../UserModel";
import {getUuid} from "../../helpers/qr/helpers";

// instantiate a dynamoose schema
const DomainSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: getUuid()
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  bannedById: {
    type: UserModel
  },
  address: {
    type: String,
    required: true
    //TODO Unique
  },
  homepage: {
    type: [String, dynamoose.NULL]
  },
  userId: {
    type: UserModel
    //TODO delete in cascade if user reference is deleted
  }
}, { "timestamps": true });

// create a model from schema and export it
export const DomainModel = dynamoose.model("domains", DomainSchema);

DomainModel.methods.set("findOne", async function(criteria: object) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});
