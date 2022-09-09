type Match<T> = {
  [K in keyof T]?: T[K] | [">" | ">=" | "<=" | "<", T[K]];
};

interface UserType {
  bannedById?: string;
  banned?: boolean;
  coolDowns?: string[];
  createdAt?: string;
  id: string;
  updatedAt?: string;
}

interface UserQueryType {
  id: object;
}

interface UserJoinedType extends UserType {
  admin?: boolean;
  homepage?: string;
  domain?: string;
  domain_id?: string;
}

interface DomainType {
  id: string;
  address: string;
  banned?: boolean;
  bannedById?: string;
  createdAt?: string;
  homepage?: string;
  updatedAt?: string;
  userId?: string;
}

interface DomainQueryType {
  id?: object;
  address?: object;
  banned?: object;
  bannedById?: object;
  createdAt?: object;
  homepage?: object;
  updatedAt?: object;
  userId?: object;
}

interface DomainSanitizedType {
  address: string;
  updatedAt?: string;
  userId?: string;
  createdAt?: string;
  id: string;
  banned?: boolean;
  bannedById: undefined;
  homepage?: string;
}

interface HostType {
  id: string;
  address: string;
  banned: boolean;
  bannedById?: string;
  createdAt: string;
  updatedAt: string;
}

interface HostQueryType {
  id: object;
  address: object;
  banned: object;
  bannedById?: object;
  createdAt: object;
  updatedAt: object;
}

interface IPType {
  id: number;
  createdAt: string;
  updatedAt: string;
  ip: string;
}

interface IPQueryType {
  id: object;
  createdAt: object;
  updatedAt: object;
  ip: object;
}

interface LinkType {
  address?: string | undefined;
  bannedById?: string;
  banned: boolean;
  createdAt: string;
  description?: string | undefined;
  domain_id?: string | undefined;
  expireIn?: string | undefined;
  id: string;
  password?: string | undefined;
  type?: string;
  target: string;
  updatedAt: string;
  userId: string;
  visit_count: number;
}

interface QrDataType {
  id: string;
  qrName: string;
  qrType: string;
  userId: string;
  isDynamic?: boolean;
  shortLinkId?: string;
  qrOptionsId?: object;
}

interface LinkQueryType {
  id: object;
  address?: object;
  domain_id?: object;
  userId?: object;
  createdAt?: object
  target?: object,
  expireIn?: object
}

interface QrDataQueryType {
  id: object;
  userId?: object;
}

interface LinkSanitizedType {
  visit_count: number;
  address?: string | undefined;
  link: string;
  createdAt: string;
  description?: string | undefined;
  expireIn: number | undefined;
  target: string;
  domain_id: string | undefined;
  password: string | undefined;
  updatedAt: string;
  userId: string;
  domain?: string | undefined;
  banned: boolean;
  id: string;
  bannedById: undefined;
}

interface LinkJoinedDomainType extends LinkType {
  domain?: string | undefined;
}

interface VisitType {
  id: number;
  countries: Record<string, number>;
  createdAt: string;
  link_id: string;
  referrers: object; //Record<string, number>;
  total: number;
  br_chrome: number;
  br_edge: number;
  br_firefox: number;
  br_ie: number;
  br_opera: number;
  br_other: number;
  br_safari: number;
  os_android: number;
  os_ios: number;
  os_linux: number;
  os_macos: number;
  os_other: number;
  os_windows: number;
}

interface StatsType {
  browser: Record<"chrome" | "edge" | "firefox" | "ie" | "opera" | "other" | "safari",
    number>;
  os: Record<"android" | "ios" | "linux" | "macos" | "other" | "windows",
    number>;
  country: Record<string, number>;
  referrer: Record<string, number>;
}

declare namespace Express {
  export interface Request {
    realIP?: string;
    pageType?: string;
    linkTarget?: string;
    protectedLink?: string;
    token?: string;
    user: UserJoinedType;
  }
}
