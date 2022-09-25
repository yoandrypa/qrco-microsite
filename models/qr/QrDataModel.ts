import dynamoose from "../../libs/dynamoose";
import { QrOptionsModel } from "./QrOptionsModel";
import { LinkModel } from "../link";
import { UserModel } from "../UserModel";

const QrDataSchema = new dynamoose.Schema({
  id: {
    rangeKey: true,
    type: String
  },
  qrName: { type: String, required: true },
  qrType: { type: String, required: true },
  isDynamic: { type: Boolean, default: false },
  shortLinkId: { type: LinkModel },
  userId: {
    type: UserModel,
    hashKey: true,
    index: {
      name: "createdAtIndex",
      global: true,
      rangeKey: "createdAt"
    }
    //TODO delete in cascade if user reference is deleted
  },
  qrOptionsId: {
    type: QrOptionsModel
  }
}, {
  "saveUnknown": true,
  "timestamps": true
});

// create a model from schema and export it
export const QrDataModel = dynamoose.model("qr_data", QrDataSchema);

QrDataModel.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});
