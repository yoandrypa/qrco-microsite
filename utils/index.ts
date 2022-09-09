import { customAlphabet } from "nanoid";
import queries from "../queries";
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths
} from "date-fns";

export const generateShortLink = (id: string | undefined, customDomain?: string | undefined): string => {
  const protocol =
    process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS === "true" || customDomain ? "https://" : "http://";
  const domain = process.env.REACT_APP_SHORT_URL_DOMAIN || process.env.REACT_APP_DEFAULT_DOMAIN;
  return `${protocol}${customDomain || domain }/${id}`;
};

// @ts-ignore
export const generateId = async (domain_id: string | undefined = "") => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    parseInt(<string>process.env.REACT_APP_LINK_LENGTH)
  );
  const address = nanoid();
  const link = await queries.link.find({
    address: { contains: address },
    domain_id: { eq: domain_id }
  });
  if (!link) return address;
  return generateId(domain_id);
};

export const sanitize = {
  //@ts_ignore
  domain: (domain: DomainType): DomainSanitizedType => ({
    ...domain,
    id: domain.id,
    bannedById: undefined
  }),
  link: (link: LinkJoinedDomainType): LinkSanitizedType => <LinkSanitizedType>({
    ...link,
    bannedById: undefined,
    link: generateShortLink(link.address, link.domain)
  })
};

export const removeWww = (host?: string | null) => {
  // @ts-ignore
  return host.replace("www.", "");
};

export class CustomError extends Error {
  public statusCode?: number;
  public data?: any;

  public constructor(message: string, statusCode = 500, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
  }
};

export const addProtocol = (url: string): string => {
  const hasProtocol = /^\w+:\/\//.test(url);
  return hasProtocol ? url : `https://${url}`;
};

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  }
  catch(e){
    return false;
  }
};

export const getStatsLimit = (): number =>
  parseInt(<string>process.env.REACT_DEFAULT_MAX_STATS_PER_LINK) || 100000000;

export const getInitStats = (): StatsType => {
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

export const getDifferenceFunction = (
  type: "lastDay" | "lastWeek" | "lastMonth" | "allTime"
): Function => {
  if (type === "lastDay") return differenceInHours;
  if (type === "lastWeek") return differenceInDays;
  if (type === "lastMonth") return differenceInDays;
  if (type === "allTime") return differenceInMonths;
  throw new Error("Unknown type.");
};

export const statsObjectToArray = (obj: StatsType) => {
  const objToArr = (key: string) =>
    // @ts-ignore
    Array.from(Object.keys(obj[key]))
      .map(name => ({
        name,
        // @ts-ignore
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
