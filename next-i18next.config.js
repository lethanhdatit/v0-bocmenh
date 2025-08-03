module.exports = {
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en"],
    localeDetection: true, // Enable built-in locale detection
  },
  fallbackLng: {
    default: ["vi"],
  },
  debug: process.env.NODE_ENV === "development",
}
