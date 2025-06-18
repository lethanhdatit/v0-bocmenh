"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, Settings, Heart } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isLoggedIn, logout, openLoginModal, openRegisterModal } = useAuth()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi"
    i18n.changeLanguage(newLang)
  }

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
  }

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/destiny", label: t("nav.destiny") },
    { href: "/dreams", label: t("nav.dreams") },
    { href: "/numerology", label: t("nav.numerology") },
    { href: "/tarot", label: t("nav.tarot") },
    { href: "/fengshui", label: t("nav.fengshui") },
    { href: "/store", label: t("nav.store") },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isUserMenuOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">BM</span>
            </div>
            <span className="text-yellow-400 font-bold text-xl hidden sm:block">Bóc Mệnh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                  pathname === item.href ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            {/* <button
              onClick={toggleLanguage}
              className="text-sm text-gray-300 hover:text-yellow-400 transition-colors px-2 py-1 rounded border border-gray-600 hover:border-yellow-500"
            >
              {i18n.language === "vi" ? "EN" : "VI"}
            </button> */}

            {isLoggedIn ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user?.name || user?.email}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>{t("nav.profile")}</span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{t("nav.wishlist")}</span>
                      </Link>
                      <hr className="my-2 border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t("auth.logout.title")}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => openLoginModal()}
                  className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  {t("auth.login.title")}
                </button>
                <button
                  onClick={() => openRegisterModal()}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition-colors"
                >
                  {t("auth.register.title")}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Toggle */}
            {/* <button
              onClick={toggleLanguage}
              className="text-sm text-gray-300 hover:text-yellow-400 transition-colors px-2 py-1 rounded border border-gray-600 hover:border-yellow-500"
            >
              {i18n.language === "vi" ? "EN" : "VI"}
            </button> */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
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
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/20"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-sm font-medium transition-colors hover:text-yellow-400 ${
                    pathname === item.href ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <hr className="border-gray-700" />

              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user?.name || user?.email}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{t("nav.profile")}</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{t("nav.wishlist")}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-sm text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("auth.logout.title")}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => openLoginModal()}
                    className="block w-full text-left text-sm text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {t("auth.login.title")}
                  </button>
                  <button
                    onClick={() => openRegisterModal()}
                    className="block w-full text-left text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    {t("auth.register.title")}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
