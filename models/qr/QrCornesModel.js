import dynamoose from '../../libs/dynamoose';
// @ts-ignore
import { v4 } from 'uuid';

const QrCornersSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: v4
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
