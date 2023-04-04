export type LinkType = {
  label: string;
  link: string;
};

export type KeyValues = {
  key?: string;
  value: string;
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

export type SocialNetworksType = { network: SocialsType, value?: string };

export type DataType = {
  mode?: string;
  userId?: string;
  id?: string;
  badge?: string;
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
  address2?: string;
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
  socials?: SocialNetworksType[];
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
  otherDetails?:HeadAndItemsType
  urls?:HeadAndItemsType
};
export type HeadAndItemsType = {
  heading: string;
  items: [{
    label: string;
    value: string;
    type?: validTypes
  }];
}
export type validTypes = 'text' | 'email' | 'phone' | 'web' | 'number'| 'date' | 'fax'|'url' | 'string';

export type SocialsType = 'facebook' | 'whatsapp' | 'twitter' | 'instagram' | 'youtube' | 'linkedin' | 'pinterest' | 'telegram' | 'tiktok' | 'reddit' | 'quora';

export type FileType = {
  content: string;
  type: string;
};
