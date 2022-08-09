export const generateShortLink = (id: string, domain?: string): string => {
  const protocol =
    process.env.REACT_REACT_CUSTOM_DOMAIN_USE_HTTPS || !domain ? "http://" : "https://";
  return `${protocol}${domain || process.env.REACT_REACT_DEFAULT_DOMAIN}/${id}`;
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
