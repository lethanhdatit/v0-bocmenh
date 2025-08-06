import { useLanguage } from '@/contexts/LanguageContext';
import { generateSEOMetadata, generateStructuredData } from '@/lib/i18n/language-config';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

interface UseSEOOptions {
  pageKey: string;
  baseUrl?: string;
  customTitle?: string;
  customDescription?: string;
  updateDocumentMeta?: boolean;
}

export function useSEO({
  pageKey,
  baseUrl = 'https://bocmenh.com',
  customTitle,
  customDescription,
  updateDocumentMeta = true,
}: UseSEOOptions) {
  const { language } = useLanguage();
  const { t } = useTranslation('seo');
  
  // Get SEO translations
  const seoTranslations = {
    [pageKey]: {
      title: customTitle || t(`${pageKey}.title`, { defaultValue: t('home.title') }),
      description: customDescription || t(`${pageKey}.description`, { defaultValue: t('home.description') }),
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
  
  const seoMetadata = generateSEOMetadata(pageKey, language, seoTranslations, baseUrl);
  const structuredData = generateStructuredData(pageKey, language, seoTranslations, baseUrl);
  
  // Update document meta tags for client-side navigation
  useEffect(() => {
    if (!updateDocumentMeta || typeof document === 'undefined') return;
    
    // Update title
    document.title = seoMetadata.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoMetadata.description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoMetadata.keywords);
    }
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && seoMetadata.canonical) {
      canonicalLink.setAttribute('href', seoMetadata.canonical);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && seoMetadata.openGraph?.title) {
      ogTitle.setAttribute('content', seoMetadata.openGraph.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && seoMetadata.openGraph?.description) {
      ogDescription.setAttribute('content', seoMetadata.openGraph.description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && seoMetadata.canonical) {
      ogUrl.setAttribute('content', seoMetadata.canonical);
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && seoMetadata.twitter?.title) {
      twitterTitle.setAttribute('content', seoMetadata.twitter.title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription && seoMetadata.twitter?.description) {
      twitterDescription.setAttribute('content', seoMetadata.twitter.description);
    }
    
  }, [seoMetadata, updateDocumentMeta]);
  
  return {
    seoMetadata,
    structuredData,
    title: seoMetadata.title,
    description: seoMetadata.description,
    keywords: seoMetadata.keywords,
  };
}

export default useSEO;
