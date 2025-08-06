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
    type?: 'website' | 'article' | 'product' | 'profile';
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
      type?: string;
    }>;
    url?: string;
    siteName?: string;
    locale?: string;
    section?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
    site?: string;
  };
  canonical?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
    media?: Record<string, string>;
    types?: Record<string, string>;
  };
  jsonLd?: Array<Record<string, any>>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  category?: string;
  applicationName?: string;
  generator?: string;
  referrer?: 'origin' | 'no-referrer' | 'origin-when-cross-origin';
}

/**
 * Generate SEO metadata for a page
 */
export function generateSEOMetadata(
  pageKey: string,
  languageCode: string,
  seoTranslations: any,
  baseUrl: string = 'https://bocmenh.com',
  options: {
    type?: 'website' | 'article' | 'product' | 'profile';
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
    authors?: string[];
    breadcrumbs?: Array<{ name: string; url: string }>;
  } = {}
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

  // Generate breadcrumbs JSON-LD
  const breadcrumbsJsonLd = options.breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: options.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  } : null;

  // Generate FAQ JSON-LD for service pages
  const faqJsonLd = ['tarot', 'numerology', 'fengshui', 'astrology'].includes(pageKey) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Làm thế nào để ${pageSEO.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${pageSEO.description} Bóc Mệnh cung cấp dịch vụ ${pageKey} chính xác và miễn phí.`
        }
      }
    ]
  } : null;

  const jsonLdSchemas = [breadcrumbsJsonLd, faqJsonLd].filter(Boolean) as Array<Record<string, any>>;
  
  return {
    title: pageSEO.title || siteSEO.siteName || 'Boc Menh',
    description: pageSEO.description || siteSEO.siteDescription || '',
    keywords: pageSEO.keywords || '',
    category: options.section || 'Spiritual Services',
    applicationName: siteSEO.siteName,
    generator: 'Next.js',
    referrer: 'origin',
    openGraph: {
      title: pageSEO.title || siteSEO.siteName,
      description: pageSEO.description || siteSEO.siteDescription,
      type: options.type || 'website',
      url: currentUrl,
      siteName: siteSEO.siteName,
      locale: langConfig?.dateLocale,
      section: options.section,
      publishedTime: options.publishedTime,
      modifiedTime: options.modifiedTime,
      authors: options.authors,
      tags: options.tags,
      images: [
        {
          url: `${baseUrl}/imgs/og-image-${languageCode}.jpg`,
          width: 1200,
          height: 630,
          alt: pageSEO.title || siteSEO.siteName,
          type: 'image/jpeg',
        },
        // Add mobile-optimized image
        {
          url: `${baseUrl}/imgs/og-image-mobile-${languageCode}.jpg`,
          width: 800,
          height: 600,
          alt: pageSEO.title || siteSEO.siteName,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSEO.title || siteSEO.siteName,
      description: pageSEO.description || siteSEO.siteDescription,
      site: siteSEO.twitterSite,
      creator: siteSEO.twitterSite,
      images: [
        `${baseUrl}/imgs/twitter-image-${languageCode}.jpg`,
        `${baseUrl}/imgs/twitter-image-square-${languageCode}.jpg`
      ],
    },
    canonical: currentUrl,
    alternates: {
      canonical: currentUrl,
      languages: alternateLanguages,
      media: {
        'only screen and (max-width: 600px)': `${baseUrl}/mobile${langPrefix}${pageUrl}`,
      },
      types: {
        'application/rss+xml': `${baseUrl}/feed.xml`,
        'application/atom+xml': `${baseUrl}/atom.xml`,
      },
    },
    jsonLd: jsonLdSchemas,
    breadcrumbs: options.breadcrumbs,
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
  type?: 'website' | 'article' | 'product' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  authors?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
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
  type,
  publishedTime,
  modifiedTime,
  section,
  tags,
  authors,
  breadcrumbs,
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
  
  const seoConfig = generateSEOMetadata(pageKey, params.lang, seoTranslations, baseUrl, {
    type,
    publishedTime,
    modifiedTime,
    section,
    tags,
    authors,
    breadcrumbs,
  });
  
  // Override images if provided
  if (images && seoConfig.openGraph) {
    seoConfig.openGraph.images = images.map(img => ({
      ...img,
      type: 'image/jpeg',
    }));
  }
  
  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    category: seoConfig.category,
    applicationName: seoConfig.applicationName,
    generator: seoConfig.generator,
    referrer: seoConfig.referrer,
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
      type: (seoConfig.openGraph?.type === 'product' ? 'website' : seoConfig.openGraph?.type) || 'website',
      url: seoConfig.canonical,
      siteName: seoTranslations.site.siteName,
      images: seoConfig.openGraph?.images || [],
      locale: langConfig?.dateLocale,
      publishedTime: seoConfig.openGraph?.publishedTime,
      modifiedTime: seoConfig.openGraph?.modifiedTime,
      section: seoConfig.openGraph?.section,
      authors: seoConfig.openGraph?.authors,
      tags: seoConfig.openGraph?.tags,
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
      other: {
        'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
        'facebook-domain-verification': process.env.FACEBOOK_DOMAIN_VERIFICATION || '',
      },
    },
    other: {
      'theme-color': '#EAB308',
      'color-scheme': 'dark light',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': seoTranslations.site.siteName,
      'msapplication-TileColor': '#EAB308',
      'msapplication-config': '/browserconfig.xml',
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

/**
 * Generate enhanced SEO for service pages (tarot, numerology, etc.)
 */
export async function generateServicePageSEO(
  pageKey: string,
  params: { lang: string },
  serviceData?: {
    publishedTime?: string;
    modifiedTime?: string;
    features?: string[];
    benefits?: string[];
  }
): Promise<Metadata> {
  const breadcrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Dịch vụ', url: '/services' },
    { name: pageKey, url: `/${pageKey}` },
  ];

  return generateMultilingualMetadata({
    pageKey,
    params,
    type: 'article',
    section: 'Spiritual Services',
    publishedTime: serviceData?.publishedTime,
    modifiedTime: serviceData?.modifiedTime || new Date().toISOString(),
    breadcrumbs,
    tags: serviceData?.features || ['tarot', 'numerology', 'feng-shui', 'astrology'],
    authors: ['Bóc Mệnh Expert Team'],
  });
}

/**
 * Generate enhanced SEO for product pages (store items)
 */
export async function generateProductPageSEO(
  productSlug: string,
  params: { lang: string },
  productData: {
    name: string;
    description: string;
    price: number;
    images: Array<{ url: string; alt: string }>;
    category: string;
    brand?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  }
): Promise<Metadata> {
  const breadcrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Cửa hàng', url: '/store' },
    { name: productData.category, url: `/store/category/${productData.category}` },
    { name: productData.name, url: `/store/${productSlug}` },
  ];

  return generateMultilingualMetadata({
    pageKey: 'store',
    params,
    type: 'product',
    customTitle: `${productData.name} - Cửa hàng Bóc Mệnh`,
    customDescription: productData.description,
    customKeywords: `${productData.name}, ${productData.category}, cửa hàng tâm linh, mua ${productData.category}`,
    section: 'E-commerce',
    breadcrumbs,
    images: productData.images,
    tags: [productData.category, 'spiritual-products', 'boc-menh-store'],
  });
}

/**
 * Generate enhanced SEO for blog/article pages
 */
export async function generateArticlePageSEO(
  articleSlug: string,
  params: { lang: string },
  articleData: {
    title: string;
    description: string;
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    category: string;
    tags: string[];
    featuredImage?: string;
  }
): Promise<Metadata> {
  const breadcrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: articleData.category, url: `/blog/category/${articleData.category}` },
    { name: articleData.title, url: `/blog/${articleSlug}` },
  ];

  const images = articleData.featuredImage ? [
    {
      url: articleData.featuredImage,
      width: 1200,
      height: 630,
      alt: articleData.title,
    }
  ] : undefined;

  return generateMultilingualMetadata({
    pageKey: 'blog',
    params,
    type: 'article',
    customTitle: articleData.title,
    customDescription: articleData.description,
    customKeywords: articleData.tags.join(', '),
    section: articleData.category,
    publishedTime: articleData.publishedTime,
    modifiedTime: articleData.modifiedTime,
    breadcrumbs,
    images,
    tags: articleData.tags,
    authors: [articleData.author],
  });
}
