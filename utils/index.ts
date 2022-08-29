import { customAlphabet } from "nanoid";
import queries from "../queries";

export const generateShortLink = (id: string | undefined, customDomain?: string | undefined): string => {
  const protocol =
    process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS === "true" || customDomain ? "https://" : "http://";
    //process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS === "true" ? "https://" : "http://";
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
    user_id: undefined,
    banned_by_id: undefined
  }),
  link: (link: LinkJoinedDomainType): LinkSanitizedType => <LinkSanitizedType>({
    ...link,
    banned_by_id: undefined,
    link: generateShortLink(link.address, link.domain)
  })
};

export const removeWww = (host = "") => {
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
  let urlPattern = new RegExp("^(https?:\\/\\/)?" + // validate protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
    "(\\#[-a-z\\d_]*)?$", "i"); // validate fragment locator
  return urlPattern.test(urlString);
};
