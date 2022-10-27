export type FramesType = {
  type: string | null;
  text: string;
  color: string;
  textColor: string;
  textUp?: boolean | false;
};

export type LinkType = {
  label: string;
  link: string;
};

export type OpeningObjType = {
  ini: string;
  end: string;
};

export type OpeningDaysType = {
  opening: OpeningObjType[];
};

export type OpeningType = {
  sun?: OpeningDaysType;
  mon?: OpeningDaysType;
  tue?: OpeningDaysType;
  wed?: OpeningDaysType;
  thu?: OpeningDaysType;
  fri?: OpeningDaysType;
  sat?: OpeningDaysType;
} | {} | null;

export type DataType = {
  mode?: string;
  userId?: string;
  id?: string;
  qrName?: string;
  number?: string;
  avatarImage?: string;
  bannerImage?: string;
  donationUnitAmount?: number;
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
  company?: string;
  contact?: string;
  about?: string;
  title?: string;
  subtitle?: string;
  web?: string;
  url?: string;
  via?: string;
  hashtags?: string;
  text?: string;
  facebook?: string;
  whatsapp?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  pinterest?: string;
  telegram?: string;
  twitter?: string;
  value?: string;
  is12hours?: boolean;
  openingTime?: OpeningType;
  urlOptionLabel?: string;
  urlOptionLink?: string;
  easiness?: {
    accessible?: boolean;
    toilet?: boolean;
    seat?: boolean;
    child?: boolean;
    pets?: boolean;
    park?: boolean;
    restaurant?: boolean;
    cafe?: boolean;
    bar?: boolean;
    shower?: boolean;
    health?: boolean;
    fastfood?: boolean;
    bed?: boolean;
    gym?: boolean;
    smoking?: boolean;
    climate?: boolean;
    training?: boolean;
    parking?: boolean;
    train?: boolean;
    bus?: boolean;
    taxi?: boolean;
    wifi?: boolean;
  } | undefined;
  isDynamic?: boolean;
  files?: File[];
};

export type SocialsType = 'facebook' | 'whatsapp' | 'twitter' | 'instagram' | 'youtube' | 'linkedin' | 'pinterest' | 'telegram';

export type ColorTypes = {
  p: string,
  s: string
};

export type FileType = {
  content: string;
  type: string;
};
