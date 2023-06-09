/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    REACT_APP_CUSTOM_DOMAIN_USE_HTTPS: process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS,

    REACT_AWS_ACCESS_KEY_ID: process.env.REACT_AWS_ACCESS_KEY_ID,
    REACT_AWS_BUCKET_NAME: process.env.REACT_AWS_BUCKET_NAME,
    REACT_AWS_SAMPLE_BUCKET_NAME: process.env.REACT_AWS_SAMPLE_BUCKET_NAME,
    REACT_AWS_DYNAMODB_URL: process.env.REACT_AWS_DYNAMODB_URL,
    REACT_AWS_REGION: process.env.REACT_AWS_REGION,
    REACT_AWS_SECRET_ACCESS_KEY: process.env.REACT_AWS_SECRET_ACCESS_KEY,
    REACT_AWS_ELASTIC_CACHE_RESOURCE_NAME: process.env.REACT_AWS_ELASTIC_CACHE_RESOURCE_NAME,

    REACT_APP_QRCO_URL: process.env.REACT_APP_QRCO_URL,
    REACT_NODE_ENV: process.env.REACT_NODE_ENV,

    PAYLINK_BASE_URL: process.env.PAYLINK_BASE_URL || 'https://ebanux.link',
  },
};

module.exports = nextConfig;
