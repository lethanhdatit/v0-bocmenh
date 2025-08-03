import "@/lib/infra/disableConsole";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";
import LocaleWrapper from "@/components/providers/LocaleWrapper";
import SWRProvider from "@/components/providers/SWRProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import AuthModals from "@/components/auth/AuthModals";
import AuthSetup from "@/components/utils/AuthSetup";
import { getBaseUrl } from "@/lib/infra/utils";
import GlobalLoadingWrapper from "@/components/ui/GlobalLoadingWrapper";
import { MyFatesProvider } from "@/contexts/MyFatesContext";
import { LayoutVisibilityProvider } from "@/contexts/LayoutVisibilityContext";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { 
  getLanguageConfig, 
  getDefaultLanguageConfig, 
  isLanguageSupported,
  getEnabledLanguages,
  type SupportedLanguageCode 
} from "@/lib/i18n/language-config";
import { notFound } from "next/navigation";

const baseUrl = getBaseUrl();
const inter = Inter({ subsets: ["latin"] });

// Generate metadata per locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const langConfig = getLanguageConfig(locale) || getDefaultLanguageConfig();
  
  const isVietnamese = langConfig.code === 'vi';
  const title = isVietnamese 
    ? "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn"
    : "Boc Menh - Discover Your Destiny";
    
  const description = isVietnamese
    ? "Khám phá vận mệnh, giải mơ, xem tướng số và nhiều tính năng thú vị khác tại Bóc Mệnh. Dịch vụ bói toán online chính xác và uy tín nhất Việt Nam."
    : "Discover your destiny, dream interpretation, palmistry and many other interesting features at Boc Menh. The most accurate and reliable online divination service in Vietnam.";

  // Generate alternate language links
  const alternateLanguages: Record<string, string> = {};
  getEnabledLanguages().forEach(lang => {
    alternateLanguages[lang.hreflang] = `${baseUrl}/${lang.code}`;
  });

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: isVietnamese
      ? "bóc mệnh, vận mệnh, giải mơ, tướng số, phong thủy, tarot, thần số học, chiêm tinh, xem bói online"
      : "boc menh, destiny, dream interpretation, palmistry, feng shui, tarot, numerology, astrology, online divination",
    authors: [{ name: "Bóc Mệnh Team" }],
    creator: "Bóc Mệnh",
    publisher: "Bóc Mệnh",
    generator: "Next.js",
    applicationName: "Bóc Mệnh",
    referrer: "origin-when-cross-origin",
    // Language
    other: {
      "language": langConfig.code,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Open Graph
    openGraph: {
      type: "website",
      locale: langConfig.hreflang.replace('-', '_'),
      alternateLocale: getEnabledLanguages()
        .filter(lang => lang.code !== locale)
        .map(lang => lang.hreflang.replace('-', '_')),
      url: `${baseUrl}/${locale}`,
      siteName: "Bóc Mệnh",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isVietnamese ? "Bóc Mệnh - Khám Phá Vận Mệnh" : "Boc Menh - Discover Your Destiny",
          type: "image/jpeg",
        },
      ],
    },
    // Twitter
    twitter: {
      card: "summary_large_image",
      site: "@bocmenh",
      creator: "@bocmenh",
      title,
      description,
      images: ["/twitter-image.jpg"],
    },
    // Additional
    category: "Entertainment",
    classification: "Astrology, Fortune Telling, Feng Shui",
    // Verification
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      other: {
        "facebook-domain-verification": "your-facebook-verification-code",
      },
    },
    // Alternate languages for SEO
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return getEnabledLanguages().map((lang) => ({
    locale: lang.code,
  }));
}

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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  // Validate locale
  if (!isLanguageSupported(locale)) {
    notFound();
  }

  const langConfig = getLanguageConfig(locale) || getDefaultLanguageConfig();

  return (
    <LocaleWrapper locale={locale}>
      <LanguageProvider initialLocale={locale as SupportedLanguageCode}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </LanguageProvider>
    </LocaleWrapper>
  );
}