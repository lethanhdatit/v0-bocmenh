import { getTranslations } from '@/i18n/server';
import { generateSEOMetadata, generateStructuredData, getLanguageConfig } from '@/lib/i18n/language-config';
import type { Metadata } from 'next';

// Get production base URL
function getProductionBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://bocmenh.com';
}

interface GenerateMetadataOptions {
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

export async function generatePageMetadata({
  pageKey,
  params,
  baseUrl = getProductionBaseUrl(),
  customTitle,
  customDescription,
  customKeywords,
  images,
}: GenerateMetadataOptions): Promise<Metadata> {
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

export async function generateStructuredDataForPage(
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
