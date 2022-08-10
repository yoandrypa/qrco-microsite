type Match<T> = {
  [K in keyof T]?: T[K] | [">" | ">=" | "<=" | "<", T[K]];
};

interface User {
  banned_by_id?: string;
  banned: boolean;
  cooldowns?: string[];
  created_at: string;
  id: string;
  updated_at: string;
}

interface UserJoined extends User {
  admin?: boolean;
  homepage?: string;
  domain?: string;
  domain_id?: string;
}

interface Domain {
  id: string;
  address: string;
  banned: boolean;
  banned_by_id?: string;
  created_at: string;
  homepage?: string;
  updated_at: string;
  user_id?: string;
}

interface DomainQuery {
  id: object;
  address: object;
  banned: object;
  banned_by_id?: object;
  created_at: object;
  homepage?: object;
  updated_at: object;
  user_id?: object;
}

interface DomainSanitized {
  id: string;
  address: string;
  banned: boolean;
  banned_by_id?: undefined;
  created_at: string;
  homepage?: string;
  updated_at: string;
  user_id?: undefined;
}

interface Host {
  id: string;
  address: string;
  banned: boolean;
  banned_by_id?: string;
  created_at: string;
  updated_at: string;
}

interface HostQuery {
  id: object;
  address: object;
  banned: object;
  banned_by_id?: object;
  created_at: object;
  updated_at: object;
}

interface IP {
  id: number;
  created_at: string;
  updated_at: string;
  ip: string;
}

interface IPQuery {
  id: object;
  created_at: object;
  updated_at: object;
  ip: object;
}

interface Link {
  address: string;
  banned_by_id?: string;
  banned: boolean;
  created_at: string;
  description?: string;
  domain_id?: string;
  expire_in: number;
  id: string;
  password?: string;
  target: string;
  updated_at: string;
  user_id?: string;
  visit_count: number;
}

interface LinkQuery {
  id: object;
  address: object;
  domain_id?: object;
  user_id?: object;
  created_at?: object
  target?: object,
  expire_in?: object
}

interface LinkSanitized {
  address: string;
  banned_by_id?: undefined;
  banned: boolean;
  created_at: string;
  domain_id?: undefined;
  id: string;
  link: string;
  password: boolean;
  target: string;
  updated_at: string;
  user_id?: undefined;
  uuid?: undefined;
  visit_count: number;
}

interface LinkJoinedDomain extends Link {
  domain?: string;
}

interface Visit {
  id: number;
  countries: Record<string, number>;
  created_at: string;
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

interface Stats {
  browser: Record<
    "chrome" | "edge" | "firefox" | "ie" | "opera" | "other" | "safari",
    number
  >;
  os: Record<
    "android" | "ios" | "linux" | "macos" | "other" | "windows",
    number
  >;
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
    user: UserJoined;
  }
}
