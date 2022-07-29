const { parsed: localEnv } = require("dotenv").config();

module.exports = {
  publicRuntimeConfig: {
    REACT_CONTACT_EMAIL: localEnv && localEnv.REACT_CONTACT_EMAIL,
    REACT_SITE_NAME: localEnv && localEnv.REACT_SITE_NAME,
    REACT_DEFAULT_DOMAIN: localEnv && localEnv.REACT_DEFAULT_DOMAIN,
    REACT_RECAPTCHA_SITE_KEY: localEnv && localEnv.REACT_RECAPTCHA_SITE_KEY,
    REACT_GOOGLE_ANALYTICS: localEnv && localEnv.REACT_GOOGLE_ANALYTICS,
    REACT_REPORT_EMAIL: localEnv && localEnv.REACT_REPORT_EMAIL,
    REACT_DISALLOW_ANONYMOUS_LINKS: localEnv && localEnv.REACT_DISALLOW_ANONYMOUS_LINKS,
    REACT_DISALLOW_REGISTRATION: localEnv && localEnv.REACT_DISALLOW_REGISTRATION,
    REACT_SENTRY_PUBLIC_DSN: localEnv && localEnv.REACT_SENTRY_PUBLIC_DSN,
  }
};
