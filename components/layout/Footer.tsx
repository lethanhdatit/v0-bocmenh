"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  const { language, setLanguage, isLoading: langIsLoading } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const footerLinks = [
    { href: "/contact", labelKey: "footer.contact" },
    { href: "/help", labelKey: "footer.help" },
    { href: "/about", labelKey: "footer.about" },
    { href: "/privacy", labelKey: "footer.privacy" },
    { href: "/terms", labelKey: "footer.terms" },
  ];

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const currentLang = languages.find((l) => l.code === language);
  const currentYear = new Date().getFullYear();

  const handleLanguageChange = async (lang: "vi" | "en") => {
    setShowLanguageMenu(false);
    await setLanguage(lang);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer
      style={{
        backgroundImage: 'url("/imgs/footer-bg.png")',
        backgroundPosition: "center 20px",
      }}
      className="bg-[#032031] bg-no-repeat bg-gray-950/80 backdrop-blur-md border-t border-gray-800 text-gray-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 flex-shrink-0 min-w-0 mb-3">
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="Bóc Mệnh - Về trang chủ"
              >
                <img
                  src="/logo.png"
                  alt="Bóc Mệnh Logo - Khám phá vận mệnh của bạn"
                  className="h-8 w-auto sm:h-9 lg:h-10 object-contain"
                  width="40"
                  height="40"
                />
              </Link>
              <Link
                href="/"
                className="flex-shrink-1 min-w-0 overflow-hidden"
                aria-label="Bóc Mệnh"
              >
                <img
                  src="/slogan.png"
                  alt="Bóc Mệnh - Mỗi người là một hộp bí ẩn"
                  className="h-5 w-auto sm:h-6 lg:h-7 object-contain transition-all duration-300"
                  style={{
                    minWidth: "60px",
                    maxWidth: "110px",
                    width: "clamp(60px, 15vw, 110px)",
                  }}
                  width="110"
                  height="28"
                />
              </Link>
            </div>
            <ul className="space-y-2">
              {footerLinks.slice(0, 2).map(
                (
                  link // Example: First 2 links
                ) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-yellow-500 transition-colors text-sm"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-3">
              {t("site.title")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.slice(2, footerLinks.length).map(
                (
                  link // Example: Remaining links
                ) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-yellow-500 transition-colors text-sm"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2 flex flex-col items-start md:items-end">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-3">
              {t("nav.language")}
            </h3>
            <div ref={langMenuRef} className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                disabled={langIsLoading}
                className="flex items-center space-x-1 text-gray-300 hover:text-yellow-500 transition-colors p-2 rounded-md hover:bg-gray-700/50 disabled:opacity-50 min-w-[150px] justify-between"
                aria-label={t("nav.language")}
              >
                {langIsLoading ? (
                  <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Globe className="w-5 h-5" />
                )}
                {currentLang && !langIsLoading && (
                  <span className="text-sm">
                    {currentLang.flag} {currentLang.name}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              <AnimatePresence>
                {showLanguageMenu && !langIsLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} // Adjusted animation direction for opening upwards
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1.5 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() =>
                          handleLanguageChange(lang.code as "vi" | "en")
                        }
                        className={`w-full text-left px-3.5 py-2 text-sm transition-colors flex items-center space-x-2.5 ${
                          language === lang.code
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "text-gray-200 hover:text-yellow-400 hover:bg-gray-800/70"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {language === lang.code && (
                          <span className="ml-auto text-yellow-500">✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} {t("site.title")}. {t("footer.copyright")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
