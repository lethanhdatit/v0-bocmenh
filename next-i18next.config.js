module.exports = {
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en"],
    localeDetection: false,
  },
  fallbackLng: {
    default: ["vi"],
  },
  debug: process.env.NODE_ENV === "development",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
