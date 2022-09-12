import dynamoose from '../../libs/dynamoose';
// @ts-ignore
import { v4 } from 'uuid';

const QrFrameShcema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: v4
  },
  type: String,
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    required: true
  },
  textUp: {
    type: Boolean,
    required: false,
    default: false
  }
}, {
  "timestamps": true
});

export const QrFrameModel = dynamoose.model("qr_frame", QrFrameShcema);
