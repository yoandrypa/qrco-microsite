export const QR_TYPE_ROUTE = '/qr/type' as string;
export const QR_CONTENT_ROUTE = '/qr/content' as string;
export const QR_DESIGNER_NEW_ROUTE = '/qr/new' as string;

export const CUSTOM_WIDTH = '780px' as string;

export const DYNAMIC_QR = ['twitter', 'whatsapp', 'facebook', 'web'] as string[];
export const SOCIALS = ['facebook', 'whatsapp', 'twitter', 'instagram', 'linkedin', 'pinterest', 'telegram', 'youtube'] as string[];
export const PARAM_QR_TEXT = 'qr_text' as string;

export const WEB = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i');
export const EMAIL = new RegExp('^\\w+(\\.\\w+)*(\\+\\w+(\\.\\w+)*)?@\\w+(\\.\\w+)+$');
