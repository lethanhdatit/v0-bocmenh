const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  i18n,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  // env: {
  //   NEXT_PUBLIC_BE_BASE_URL: process.env.BE_BASE_URL,
  // },
};

module.exports = nextConfig;
