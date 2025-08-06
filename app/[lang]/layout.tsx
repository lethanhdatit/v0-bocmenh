import type React from "react";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SWRProvider from "@/components/providers/SWRProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import AuthModals from "@/components/auth/AuthModals";
import AuthSetup from "@/components/utils/AuthSetup";
import GlobalLoadingWrapper from "@/components/ui/GlobalLoadingWrapper";
import { MyFatesProvider } from "@/contexts/MyFatesContext";
import { LayoutVisibilityProvider } from "@/contexts/LayoutVisibilityContext";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { getEnabledLanguages } from "@/lib/i18n/language-config";
import type { SupportedLanguageCode } from "@/lib/i18n/language-config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

// Starry background component
const starryBackground = (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      {[...Array(18)].map((_, i) => (
        <div
          key={`gold-${i}`}
          className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// Validate if the locale is supported
function isValidLocale(locale: string): locale is SupportedLanguageCode {
  const enabledLanguages = getEnabledLanguages();
  return enabledLanguages.some((lang) => lang.code === locale);
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Validate locale
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  return (
    <LanguageProvider>
      <SWRProvider>
        <MyFatesProvider>
          <AuthProvider>
            <LayoutVisibilityProvider>
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-grow pt-16 relative">
                  {starryBackground}
                  <div className="relative z-0">{children}</div>
                  <ScrollToTopButton />
                </main>
                <Footer />
              </div>
              <Toaster />
              <AuthModals />
              <AuthSetup />
              <GlobalLoadingWrapper />
            </LayoutVisibilityProvider>
          </AuthProvider>
        </MyFatesProvider>
      </SWRProvider>
    </LanguageProvider>
  );
}

// Generate static params for enabled locales
export async function generateStaticParams() {
  const enabledLanguages = getEnabledLanguages();

  return enabledLanguages.map((lang) => ({
    lang: lang.code,
  }));
}
