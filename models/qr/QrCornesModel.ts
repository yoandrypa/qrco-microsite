import dynamoose from '../../libs/dynamoose';
import {getUuid} from "../../helpers/qr/helpers";

const QrCornersSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: getUuid()
  },
  topL: {
    type: String,
    required: true
  },
  topR: {
    type: String,
    required: true
  },
  bottom: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const QrCornersModel = dynamoose.model("qr_corners", QrCornersSchema);
