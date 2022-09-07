export type OptionsType = {
  width: number;
  height: number;
  type: string;
  data: string;
  image: string | null;
  margin: number;
  qrOptions: { typeNumber: number; mode: string; errorCorrectionLevel: string; };
  imageOptions: { hideBackgroundDots: boolean; imageSize: number; margin: number; crossOrigin: string; };
  dotsOptions: { color: string; type: string; };
  backgroundOptions: { color: string; };
  cornersSquareOptions: { color: string; type: string; };
  cornersDotOptions: { color: string; type: string; };
}

export type BackgroundType = {
  type: string | null;
  opacity: number;
  size: number;
  file: string | null;
  x: number;
  y: number;
  imgSize: number;
  invert?: boolean | false;
  backColor?: string | null;
}

export type FramesType = {
  type: string | null;
  text: string;
  color: string;
  textColor: string;
  textUp?: boolean | false;
}

export type DataType = {
  number?: string;
  message?: string;
  subject?: string;
  body?: string;
  email?: string;
  name?: string;
  password?: string;
  encription?: string;
  hidden?: string;
  prefix?: string;
  lastName?: string;
  firstName?: string;
  cell?: string;
  phone?: string;
  fax?: string;
  organization?: string;
  position?: string;
  address?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  web?: string;
  url?: string;
  via?: string;
  hashtags?: string;
  text?: string;
  facebook?: string;
  whatsapp?: string;
  linkedin?: string;
  pinterest?: string;
  telegram?: string;
  twitter?: string;
  isDynamic?: boolean;
}
