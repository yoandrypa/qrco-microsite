import dynamoose from '../../libs/dynamoose';
import {getUuid} from "../../helpers/qr/helpers";

const QrBackgroundSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: getUuid()
  },
  type: String,
  opacity: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  file: String,
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  imageSize: {
    type: Number,
    required: true
  },
  invert: {
    type: Boolean,
    required: false,
    default: false
  },
  backColor: String
}, {
  "timestamps": true
});

export const QrBackgroundModel = dynamoose.model("qr_background", QrBackgroundSchema);
