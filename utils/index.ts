import { customAlphabet } from "nanoid";
import queries from "../queries";

export const generateShortLink = (id: string, domain?: string): string => {
  const protocol =
    process.env.REACT_REACT_CUSTOM_DOMAIN_USE_HTTPS || !domain ? "http://" : "https://";
  return `${protocol}${domain || process.env.REACT_REACT_DEFAULT_DOMAIN}/${id}`;
};

// @ts-ignore
export const generateId = async (domain_id: string = null) => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    // @ts-ignore
    6//parseInt(process.env.REACT_LINK_LENGTH)
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
