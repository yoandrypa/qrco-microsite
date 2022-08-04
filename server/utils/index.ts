import ms from "ms";
import generate from "nanoid/generate";
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths
} from "date-fns";

import query from "../queries";
import env from "../env";

export class CustomError extends Error {
  public statusCode?: number;
  public data?: any;

  public constructor(message: string, statusCode = 500, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const isAdmin = (email: string): boolean =>
  env.REACT_ADMIN_EMAILS.split(",")
    .map(e => e.trim())
    .includes(email);

export const generateId = async (domain_id: string = null) => {
  const address = generate(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    env.REACT_LINK_LENGTH
  );
  const link = await query.link.find({
    address: { contains: address },
    domain_id: { eq: domain_id }
  });
  if (!link) return address;
  return generateId(domain_id);
};

export const addProtocol = (url: string): string => {
  const hasProtocol = /^\w+:\/\//.test(url);
  return hasProtocol ? url : `https://${url}`;
};

export const generateShortLink = (id: string, domain?: string): string => {
  const protocol =
    env.REACT_CUSTOM_DOMAIN_USE_HTTPS || !domain ? "http://" : "https://";
  return `${protocol}${domain || env.REACT_DEFAULT_DOMAIN}/${id}`;
};

/*export const getRedisKey = {
  // TODO: remove user id and make domain id required
  link: (address: string, domain_id?: string, user_id?: string) =>
    `${address}-${domain_id || ""}-${user_id || ""}`,
  domain: (address: string) => `d-${address}`,
  host: (address: string) => `h-${address}`,
  user: (emailOrKey: string) => `u-${emailOrKey}`
};*/

// TODO: Add statsLimit
export const getStatsLimit = (): number =>
  env.REACT_DEFAULT_MAX_STATS_PER_LINK || 100000000;

export const getStatsCacheTime = (total?: number): number => {
  return (total > 50000 ? ms("5 minutes") : ms("1 minutes")) / 1000;
};

export const statsObjectToArray = (obj: Stats) => {
  const objToArr = key =>
    Array.from(Object.keys(obj[key]))
      .map(name => ({
        name,
        value: obj[key][name]
      }))
      .sort((a, b) => b.value - a.value);

  return {
    browser: objToArr("browser"),
    os: objToArr("os"),
    country: objToArr("country"),
    referrer: objToArr("referrer")
  };
};

export const getDifferenceFunction = (
  type: "lastDay" | "lastWeek" | "lastMonth" | "allTime"
): Function => {
  if (type === "lastDay") return differenceInHours;
  if (type === "lastWeek") return differenceInDays;
  if (type === "lastMonth") return differenceInDays;
  if (type === "allTime") return differenceInMonths;
  throw new Error("Unknown type.");
};

export const getUTCDate = (dateString?: Date) => {
  const date = new Date(dateString || Date.now());
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours()
  );
};

export const STATS_PERIODS: [number, "lastDay" | "lastWeek" | "lastMonth"][] = [
  [1, "lastDay"],
  [7, "lastWeek"],
  [30, "lastMonth"]
];

export const getInitStats = (): Stats => {
  return Object.create({
    browser: {
      chrome: 0,
      edge: 0,
      firefox: 0,
      ie: 0,
      opera: 0,
      other: 0,
      safari: 0
    },
    os: {
      android: 0,
      ios: 0,
      linux: 0,
      macos: 0,
      other: 0,
      windows: 0
    },
    country: {},
    referrer: {}
  });
};

export const sanitize = {
  domain: (domain: Domain): DomainSanitized => ({
    ...domain,
    id: domain.id,
    user_id: undefined,
    banned_by_id: undefined
  }),
  link: (link: LinkJoinedDomain): LinkSanitized => ({
    ...link,
    banned_by_id: undefined,
    domain_id: undefined,
    user_id: undefined,
    uuid: undefined,
    id: link.id,
    password: !!link.password,
    link: generateShortLink(link.address, link.domain)
  })
};

export const removeWww = (host = "") => {
  return host.replace("www.", "");
};
