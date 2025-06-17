import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bocmenh.com"

  const routes = [
    "",
    "/destiny",
    "/dreams",
    "/numerology",
    "/tarot",
    "/fengshui",
    "/compatibility",
    "/auth/login",
    "/auth/register",
    // Add more routes as needed
  ]

  const sitemap: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            "vi-VN": `${baseUrl}/vi${route}`,
            "en-US": `${baseUrl}/en${route}`,
          },
        },
      })
    })
  })

  return sitemap
}
