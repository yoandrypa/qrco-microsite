import dynamoose from '../libs/dynamoose';
// @ts-ignore
import { v4 } from 'uuid';

const QrSchema = new dynamoose.Schema({

  }, {
    "timestamps": true
  }
);

