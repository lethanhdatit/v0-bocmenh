const { i18n } = require("./next-i18next.config.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
