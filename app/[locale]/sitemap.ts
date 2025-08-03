import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/infra/utils'
import { getEnabledLanguages } from '@/lib/i18n/language-config'

const baseUrl = getBaseUrl()

// Định nghĩa các route chính của website
const routes = [
  {
    url: '',
    priority: 1.0,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/destiny',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/dreams',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/numerology',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/name-analysis',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/tarot',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/fengshui',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/palmistry',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/horoscope',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/astrology',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/compatibility',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/moving-date',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/wedding-date',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/business-name',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/meditation',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/crystals',
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/store',
    priority: 0.7,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/topups',
    priority: 0.9,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/topups-checkout',
    priority: 0.3,
    changeFrequency: 'never' as const,
  },
  {
    url: '/topups-history',
    priority: 0.3,
    changeFrequency: 'never' as const,
  },
  {
    url: '/about',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/contact',
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/help',
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/privacy',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
  {
    url: '/terms',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
]

export default function sitemap({ 
  params 
}: { 
  params: { locale: string } 
}): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  const locale = params.locale
  
  return routes.map((route) => ({
    url: `${baseUrl}/${locale}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: getEnabledLanguages().reduce((acc, lang) => {
        acc[lang.hreflang] = `${baseUrl}/${lang.code}${route.url}`
        return acc
      }, {} as Record<string, string>),
    },
  }))
}
