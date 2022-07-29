import { cleanEnv, num, str, bool } from "envalid";

const env = cleanEnv(process.env, {
  REACT_PORT: num({ default: 3000 }),
  REACT_SITE_NAME: str({ example: "Ebanux" }),
  REACT_DEFAULT_DOMAIN: str({ example: "ebanux.com" }),
  REACT_LINK_LENGTH: num({ default: 6 }),
  REACT_REDIS_HOST: str({ default: "127.0.0.1" }),
  REACT_REDIS_PORT: num({ default: 6379 }),
  REACT_REDIS_PASSWORD: str({ default: "" }),
  REACT_USER_LIMIT_PER_DAY: num({ default: 50 }),
  REACT_NON_USER_COOLDOWN: num({ default: 10 }),
  REACT_DEFAULT_MAX_STATS_PER_LINK: num({ default: 5000 }),
  REACT_DISALLOW_ANONYMOUS_LINKS: bool({ default: false }),
  REACT_DISALLOW_REGISTRATION: bool({ default: false }),
  REACT_CUSTOM_DOMAIN_USE_HTTPS: bool({ default: false }),
  REACT_ADMIN_EMAILS: str({ default: "" }),
  REACT_RECAPTCHA_SITE_KEY: str({ default: "" }),
  REACT_RECAPTCHA_SECRET_KEY: str({ default: "" }),
  REACT_GOOGLE_SAFE_BROWSING_KEY: str({ default: "" }),
  REACT_GOOGLE_ANALYTICS: str({ default: "" }),
  REACT_GOOGLE_ANALYTICS_UNIVERSAL: str({ default: "" }),
  REACT_MAIL_FROM: str({
    default: "",
    example: "Ebanux Team <info@ebanux.com>"
  }),
  REACT_REPORT_EMAIL: str({ default: "" }),
  REACT_CONTACT_EMAIL: str({ default: "" }),
  REACT_SENTRY_PRIVATE_DSN: str({ default: "" }),
  REACT_SENTRY_PUBLIC_DSN: str({ default: "" })
});

export default env;
