import { getTranslations } from '@/i18n/server';
import { getLanguageConfig, getDefaultLanguageConfig, getEnabledLanguages } from '@/lib/i18n/language-config';
import type { Metadata } from 'next';

// Get production base URL
export function getProductionBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://bocmenh.com';
}

/**
 * SEO Configuration for different page types
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article';
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    images?: string[];
  };
  canonical?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}

/**
 * Generate SEO metadata for a page
 */
export function generateSEOMetadata(
  pageKey: string,
  languageCode: string,
  seoTranslations: any,
  baseUrl: string = 'https://bocmenh.com'
): SEOConfig {
  const langConfig = getLanguageConfig(languageCode);
  const defaultLang = getDefaultLanguageConfig();
  
  // Get page-specific SEO data
  const pageSEO = seoTranslations[pageKey] || seoTranslations.home;
  const siteSEO = seoTranslations.site || {};
  
  // Build the URL
  const isDefaultLang = languageCode === defaultLang.code;
  const langPrefix = isDefaultLang ? '' : `/${languageCode}`;
  const pageUrl = pageKey === 'home' ? '' : `/${pageKey}`;
  const currentUrl = `${baseUrl}${langPrefix}${pageUrl}`;
  
  // Generate alternate language URLs
  const alternateLanguages: Record<string, string> = {};
  getEnabledLanguages().forEach(lang => {
    const altLangPrefix = lang.code === defaultLang.code ? '' : `/${lang.code}`;
    alternateLanguages[lang.code] = `${baseUrl}${altLangPrefix}${pageUrl}`;
  });
  
  return {
    title: pageSEO.title || siteSEO.siteName || 'Boc Menh',
    description: pageSEO.description || siteSEO.siteDescription || '',
    keywords: pageSEO.keywords || '',
    openGraph: {
      title: pageSEO.title || siteSEO.siteName,
      description: pageSEO.description || siteSEO.siteDescription,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/imgs/og-image-${languageCode}.jpg`,
          width: 1200,
          height: 630,
          alt: pageSEO.title || siteSEO.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSEO.title || siteSEO.siteName,
      description: pageSEO.description || siteSEO.siteDescription,
      images: [`${baseUrl}/imgs/twitter-image-${languageCode}.jpg`],
    },
    canonical: currentUrl,
    alternates: {
      canonical: currentUrl,
      languages: alternateLanguages,
    },
  };
}

/**
 * Generate structured data for SEO
 */
export function generateStructuredData(
  pageKey: string,
  languageCode: string,
  seoTranslations: any,
  baseUrl: string = 'https://bocmenh.com'
) {
  const langConfig = getLanguageConfig(languageCode);
  const siteSEO = seoTranslations.site || {};
  const pageSEO = seoTranslations[pageKey] || seoTranslations.home;
  
  const defaultLang = getDefaultLanguageConfig();
  const isDefaultLang = languageCode === defaultLang.code;
  const langPrefix = isDefaultLang ? '' : `/${languageCode}`;
  const pageUrl = pageKey === 'home' ? '' : `/${pageKey}`;
  const currentUrl = `${baseUrl}${langPrefix}${pageUrl}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSEO.siteName || 'Boc Menh',
    description: siteSEO.siteDescription || '',
    url: currentUrl,
    inLanguage: languageCode,
    author: {
      '@type': 'Organization',
      name: siteSEO.author || 'Boc Menh Team',
    },
    publisher: {
      '@type': 'Organization',
      name: siteSEO.siteName || 'Boc Menh',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };
}

export interface GenerateSEOMetadataOptions {
  pageKey: string;
  params: { lang: string };
  baseUrl?: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
}

/**
 * Generate multilingual SEO metadata for Next.js pages
 */
export async function generateMultilingualMetadata({
  pageKey,
  params,
  baseUrl = getProductionBaseUrl(),
  customTitle,
  customDescription,
  customKeywords,
  images,
}: GenerateSEOMetadataOptions): Promise<Metadata> {
  const { t } = await getTranslations('seo');
  const langConfig = getLanguageConfig(params.lang);
  
  // Get SEO translations
  const seoTranslations = {
    [pageKey]: {
      title: customTitle || t(`${pageKey}.title`, { defaultValue: t('home.title') }),
      description: customDescription || t(`${pageKey}.description`, { defaultValue: t('home.description') }),
      keywords: customKeywords || t(`${pageKey}.keywords`, { defaultValue: t('home.keywords') }),
    },
    site: {
      siteName: t('site.siteName'),
      siteDescription: t('site.siteDescription'),
      author: t('site.author'),
      twitterSite: t('site.twitterSite'),
      facebookAppId: t('site.facebookAppId'),
    },
  };
  
  const seoConfig = generateSEOMetadata(pageKey, params.lang, seoTranslations, baseUrl);
  
  // Override images if provided
  if (images && seoConfig.openGraph) {
    seoConfig.openGraph.images = images;
  }
  
  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoTranslations.site.author }],
    creator: seoTranslations.site.author,
    publisher: seoTranslations.site.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: seoConfig.alternates,
    openGraph: {
      title: seoConfig.openGraph?.title,
      description: seoConfig.openGraph?.description,
      type: seoConfig.openGraph?.type || 'website',
      url: seoConfig.canonical,
      siteName: seoTranslations.site.siteName,
      images: seoConfig.openGraph?.images || [],
      locale: langConfig?.dateLocale,
    },
    twitter: {
      card: seoConfig.twitter?.card || 'summary_large_image',
      title: seoConfig.twitter?.title,
      description: seoConfig.twitter?.description,
      site: seoTranslations.site.twitterSite,
      creator: seoTranslations.site.twitterSite,
      images: seoConfig.twitter?.images || [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  };
}

/**
 * Generate structured data for SEO
 */
export async function generateMultilingualStructuredData(
  pageKey: string,
  params: { lang: string },
  baseUrl: string = getProductionBaseUrl()
) {
  const { t } = await getTranslations('seo');
  
  const seoTranslations = {
    [pageKey]: {
      title: t(`${pageKey}.title`, { defaultValue: t('home.title') }),
      description: t(`${pageKey}.description`, { defaultValue: t('home.description') }),
      keywords: t(`${pageKey}.keywords`, { defaultValue: t('home.keywords') }),
    },
    site: {
      siteName: t('site.siteName'),
      siteDescription: t('site.siteDescription'),
      author: t('site.author'),
      twitterSite: t('site.twitterSite'),
      facebookAppId: t('site.facebookAppId'),
    },
  };
  
  return generateStructuredData(pageKey, params.lang, seoTranslations, baseUrl);
}

/**
 * Update document meta tags for client-side navigation
 * Useful for SPAs when navigating between pages without full page reload
 */
export function updateClientSideMetaTags(seoConfig: SEOConfig): void {
  if (typeof document === 'undefined') return;
  
  // Update title
  document.title = seoConfig.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seoConfig.description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', seoConfig.keywords);
  }
  
  // Update canonical URL
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink && seoConfig.canonical) {
    canonicalLink.setAttribute('href', seoConfig.canonical);
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && seoConfig.openGraph?.title) {
    ogTitle.setAttribute('content', seoConfig.openGraph.title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && seoConfig.openGraph?.description) {
    ogDescription.setAttribute('content', seoConfig.openGraph.description);
  }
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && seoConfig.canonical) {
    ogUrl.setAttribute('content', seoConfig.canonical);
  }
  
  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle && seoConfig.twitter?.title) {
    twitterTitle.setAttribute('content', seoConfig.twitter.title);
  }
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription && seoConfig.twitter?.description) {
    twitterDescription.setAttribute('content', seoConfig.twitter.description);
  }
}

/**
 * Generate SEO config for client-side usage with translation support
 * Useful for client-side components that need SEO metadata
 */
export function generateClientSideSEOConfig(
  pageKey: string,
  languageCode: string,
  translations: {
    t: (key: string, options?: { defaultValue?: string }) => string;
  },
  baseUrl: string = 'https://bocmenh.com',
  customTitle?: string,
  customDescription?: string,
  customKeywords?: string
): SEOConfig {
  const { t } = translations;
  
  // Get SEO translations
  const seoTranslations = {
    [pageKey]: {
      title: customTitle || t(`${pageKey}.title`, { defaultValue: t('home.title') }),
      description: customDescription || t(`${pageKey}.description`, { defaultValue: t('home.description') }),
      keywords: customKeywords || t(`${pageKey}.keywords`, { defaultValue: t('home.keywords') }),
    },
    site: {
      siteName: t('site.siteName'),
      siteDescription: t('site.siteDescription'),
      author: t('site.author'),
      twitterSite: t('site.twitterSite'),
      facebookAppId: t('site.facebookAppId'),
    },
  };
  
  return generateSEOMetadata(pageKey, languageCode, seoTranslations, baseUrl);
}
