import dynamoose from '../../libs/dynamoose';

const QrVCardPlusSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String
  },
  prefix: String,
  firstName: String,
  lastName: String,
  cell: String,
  phone: String,
  fax: String,
  organization: String,
  position: String,
  address: String,
  city: String,
  zip: String,
  state: String,
  country: String,
  email: String,
  web: String,
  facebook: String,
  whatsapp: String,
  linkedin: String,
  pinterest: String,
  telegram: String,
  twitter: String,
  isDynamic: Boolean,
}, {
  "timestamps": true
});

// create a model from schema and export it
export const QrVCardPlus = dynamoose.model("qr_vcard_plus", QrVCardPlusSchema);
