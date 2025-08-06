import { redirect } from 'next/navigation';
import { getDefaultLanguageConfig } from '@/lib/i18n/language-config';

// Root page - redirect to default locale
export default function RootPage() {
  const defaultLang = getDefaultLanguageConfig();
  
  // For default language, don't redirect to /[lang] to maintain clean URLs
  // The middleware will handle routing properly
  redirect(`/${defaultLang.code}`);
}
