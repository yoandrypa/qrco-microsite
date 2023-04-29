import sendMeMoney from './sendMeMoney';
import donation from './donation';
import sDonation from './donation/section';
// import sContact from './contact/section';

export const qrTypes = {
  // Add here all reference to the dynamic Qr types.
  [sendMeMoney.id]: sendMeMoney,
  [donation.id]: donation,
}

export const sectionsQrTypes = {
  // Add here all reference to the dynamic Qr sections types.
  [sDonation.id]: sDonation,
  // [sContact.id]: sContact,
}