import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/infra/utils'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/profile/',
          '/services-history/',
          '/topups-history/',
          '/topups-checkout/',
          '/wishlist/',
        ],
      },
      // SEO bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/profile/',
          '/services-history/',
          '/topups-history/',
          '/topups-checkout/',
          '/wishlist/',
        ],
      },
      // Block AI scrapers if needed
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
