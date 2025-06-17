"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Globe, User, LogOut, Crown, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "@/i18n/settings"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const { user, isLoggedIn, logout, isLoading } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/destiny", label: t("nav.destiny") },
    { href: "/dreams", label: t("nav.dreams") },
    { href: "/numerology", label: t("nav.numerology") },
    { href: "/tarot", label: t("nav.tarot") },
    { href: "/fengshui", label: t("nav.fengshui") },
    { href: "/compatibility", label: t("nav.compatibility") },
    { href: "/wedding-date", label: t("nav.weddingDate") },
    { href: "/community", label: t("nav.community") },
    { href: "/store", label: t("nav.store") },
  ]

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setShowLanguageMenu(false)
  }

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    // Sẵn sàng cho tương lai
    // { code: "zh", name: "中文", flag: "🇨🇳" },
    // { code: "ja", name: "日本語", flag: "🇯🇵" },
  ]

  // Thêm useEffect để handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageMenu) {
        setShowLanguageMenu(false)
      }
      if (showUserMenu) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLanguageMenu, showUserMenu])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">BM</span>
            </div>
            <span className="text-xl font-bold text-yellow-500">{t("site.title")}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Language & Auth */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">
                  {languages.find((lang) => lang.code === language)?.flag}{" "}
                  {languages.find((lang) => lang.code === language)?.name}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as Language)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
                          language === lang.code
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "text-gray-300 hover:text-yellow-500 hover:bg-gray-800"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {language === lang.code && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Section */}
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            ) : isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                  {user.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        {user.isPremium && (
                          <span className="inline-flex items-center space-x-1 text-yellow-500 text-xs mt-1">
                            <Crown className="w-3 h-3" />
                            <span>Premium</span>
                          </span>
                        )}
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t("auth.profile")}
                      </Link>
                      <Link
                        href="/history"
                        className="block px-4 py-2 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t("auth.history")}
                      </Link>
                      {!user.isPremium && (
                        <Link
                          href="/premium"
                          className="block px-4 py-2 text-yellow-500 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {t("auth.premium")}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t("auth.logout")}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/auth/login" className="text-gray-300 hover:text-yellow-500 transition-colors px-3 py-1">
                  {t("auth.login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  {t("auth.register")}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-300 hover:text-yellow-500">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-300 hover:text-yellow-500 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                {isLoggedIn && user ? (
                  <>
                    <div className="py-2">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-gray-300 hover:text-yellow-500 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("auth.profile")}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="block text-gray-300 hover:text-red-400 transition-colors py-2"
                    >
                      {t("auth.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-gray-300 hover:text-yellow-500 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("auth.login")}
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("auth.register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
