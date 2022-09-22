export const QR_TYPE_ROUTE = '/qr/type' as string;
export const QR_CONTENT_ROUTE = '/qr/content' as string;
export const QR_DESIGNER_NEW_ROUTE = '/qr/new' as string;

export const CUSTOM_WIDTH = '780px' as string;

export const DYNAMIC_QR = ['twitter', 'whatsapp', 'facebook', 'web'] as string[];
export const SOCIALS = ['facebook', 'whatsapp', 'twitter', 'instagram', 'linkedin', 'pinterest', 'telegram', 'youtube'] as string[];
export const PARAM_QR_TEXT = 'qr_text' as string;

export const WEB = new RegExp('^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$','i');;
export const EMAIL = new RegExp('^\\w+(\\.\\w+)*(\\+\\w+(\\.\\w+)*)?@\\w+(\\.\\w+)+$', 'i');
