/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Removed i18n config since we're using next-i18n-router middleware
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
      allowedOrigins: ["localhost:3000", "bocmenh.com"],
    },
  },
  // Optional: Add trailingSlash for consistent URLs
  trailingSlash: false,
  // env: {
  //   NEXT_PUBLIC_BE_BASE_URL: process.env.BE_BASE_URL,
  // },
};

module.exports = nextConfig;
