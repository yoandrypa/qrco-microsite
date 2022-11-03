/** @type {import("next").NextConfig} */

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    // Fixes yarn packages that depend on `fs` module
    config.resolve.fallback = { fs: false };
    config.experiments = {
      topLevelAwait: true, // Fix top-level-await experiment enable
      layers: true, // Fix layers experiment enable
    };
    return config;
  },
  images: {
    domains: [process.env.REACT_AWS_BUCKET_NAME + ".s3.amazonaws.com"],
  },
  env: {
    REACT_APP_CUSTOM_DOMAIN_USE_HTTPS: process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS,
    REACT_APP_DEFAULT_DOMAIN: process.env.REACT_APP_DEFAULT_DOMAIN,
    REACT_AWS_ACCESS_KEY_ID: process.env.REACT_AWS_ACCESS_KEY_ID,
    REACT_AWS_BUCKET_NAME: process.env.REACT_AWS_BUCKET_NAME,
    REACT_AWS_DYNAMODB_URL: process.env.REACT_AWS_DYNAMODB_URL,
    REACT_AWS_REGION: process.env.REACT_AWS_REGION,
    REACT_AWS_SECRET_ACCESS_KEY: process.env.REACT_AWS_SECRET_ACCESS_KEY,
    REACT_AWS_ELASTIC_CACHE_RESOURCE_NAME: process.env.REACT_AWS_ELASTIC_CACHE_RESOURCE_NAME,
    REACT_NODE_ENV: process.env.REACT_NODE_ENV

  },
};

