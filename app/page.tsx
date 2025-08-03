import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getDefaultLanguageConfig, isLanguageSupported } from '@/lib/i18n/language-config';

// Helper function to detect language from Accept-Language header
function detectLocaleFromHeaders(): string {
  try {
    const headersList = headers();
    const acceptLanguage = headersList.get('accept-language');
    
    if (acceptLanguage) {
      // Parse Accept-Language header
      const languages = acceptLanguage
        .split(',')
        .map(lang => {
          const [code, q = '1'] = lang.trim().split(';q=');
          return { code: code.toLowerCase(), quality: parseFloat(q) };
        })
        .sort((a, b) => b.quality - a.quality);
      
      // Find first supported language
      for (const lang of languages) {
        const langCode = lang.code.split('-')[0]; // Get main language code
        if (isLanguageSupported(langCode)) {
          return langCode;
        }
      }
    }
  } catch (error) {
    console.log('Error detecting locale from headers:', error);
  }
  
  // Fallback to default
  return getDefaultLanguageConfig().code;
}

export default function RootPage() {
  // Detect locale and redirect
  const locale = detectLocaleFromHeaders();
  redirect(`/${locale}`);
}
