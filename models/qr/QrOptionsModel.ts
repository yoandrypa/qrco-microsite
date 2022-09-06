import dynamoose from '../../libs/dynamoose';
// @ts-ignore
import { v4 } from 'uuid';

const QrOptionsSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: v4
  },
  width: Number,
  height: Number,
  type: String,
  data: String,
  image: {
    type: String,
    required: false
  },
  margin: Number,
  qrOptions: {
    type: Object,
    schema: {
      typeNumber: Number,
      mode: String,
      errorCorrectionLevel: String
    }
  },
  imageOptions: {
    type: Object,
    schema: {
      hideBackgroundDots: Boolean,
      imageSize: Number,
      margin: Number,
      crossOrigin: String
    }
  },
  dotsOptions: {
    type: Object,
    schema: {
      color: String,
      type: String
    }
  },
  backgroundOptions: {
    type: Object,
    schema: {color: String}
  },
  cornersSquareOptions: {
    type: Object,
    schema: {
      color: String,
      type: String
    }
  },
  cornersDotOptions: {
    type: Object,
    schema: {
      color: String,
      type: String
    }
  }
}, {
  "timestamps": true
});
