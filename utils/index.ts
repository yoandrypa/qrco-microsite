export const generateShortLink = (
  id: string | undefined, customDomain?: string | undefined): string => {
  const protocol =
    process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS === "true" || customDomain
      ? "https://"
      : "http://";
  const domain = process.env.REACT_APP_DEFAULT_DOMAIN;
  return `${protocol}${customDomain || domain}/${id}`;
};

export class CustomError extends Error {
  public statusCode?: number;
  public data?: any;

  public constructor (message: string, statusCode = 500, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
  }
};

export const removeWww = (host?: string | null) => {
  // @ts-ignore
  return host.replace("www.", "");
};