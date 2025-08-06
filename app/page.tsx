import { redirect } from 'next/navigation';
import { getDefaultLanguageConfig } from '@/lib/i18n/language-config';

// Root page - redirect to default locale
export default function RootPage() {
  const defaultLang = getDefaultLanguageConfig();
  redirect(`/${defaultLang.code}`);
}
