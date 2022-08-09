/** @type {import("next").NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Fixes yarn packages that depend on `fs` module
    config.resolve.fallback = {fs: false};
    // Fix top-level-await experiment enable
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    APP_COOKIES_DOMAIN: process.env.APP_COOKIES_DOMAIN,
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
    AWS_COGNITO_DOMAIN: process.env.AWS_COGNITO_DOMAIN,
    AWS_COGNITO_LOGOUT_REDIRECT_URI: process.env.AWS_COGNITO_LOGOUT_REDIRECT_URI,
    AWS_COGNITO_POOL_ID: process.env.AWS_COGNITO_POOL_ID,
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_DYNAMODB_URL: process.env.AWS_DYNAMODB_URL,
    AWS_REGION: process.env.AWS_REGION,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    APP_CUSTOM_DOMAIN_USE_HTTPS: process.env.APP_CUSTOM_DOMAIN_USE_HTTPS,
    APP_DEFAULT_DOMAIN: process.env.APP_DEFAULT_DOMAIN,
    APP_PORT: process.env.APP_PORT,
    APP_SITE_NAME: process.env.APP_SITE_NAME
  }
};
