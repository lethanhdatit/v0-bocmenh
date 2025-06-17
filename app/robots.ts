import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bocmenh.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dev/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
