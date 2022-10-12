import { ColorTypes } from "./types/types";

export const QR_TYPE_ROUTE = '/qr/type' as string;
export const QR_CONTENT_ROUTE = '/qr/content' as string;
export const QR_DESIGN_ROUTE = '/qr/design' as string;

export const SOCIALS = ['facebook', 'whatsapp', 'twitter', 'instagram', 'linkedin', 'pinterest', 'telegram', 'youtube'] as string[];
export const PARAM_QR_TEXT = 'qr_text' as string;

export const EMAIL = new RegExp('^\\w+(\\.\\w+)*(\\+\\w+(\\.\\w+)*)?@\\w+(\\.\\w+)+$', 'i');

export const DAYS = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday'
} as object;

export const DEFAULT_COLORS = { p: '#0f4d8c', s: '#99c4f0' } as ColorTypes;
