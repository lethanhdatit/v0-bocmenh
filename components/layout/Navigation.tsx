"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Crown, ChevronDown, History, Settings, ShoppingBag } from "lucide-react" // Bỏ Globe
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "react-i18next"
// Bỏ useLanguage vì đã chuyển sang Footer

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  // Bỏ state và ref liên quan đến language menu
  const { user, isLoggedIn, logout, isLoading: authIsLoading } = useAuth()
  const { t } = useTranslation()
  // Bỏ hook useLanguage

  const userMenuRef = useRef<HTMLDivElement>(null)
  // Bỏ langMenuRef

  const navItems = [
    // Bỏ mục "nav.home"    
    { href: "/dreams", labelKey: "nav.dreams" },
    { href: "/numerology", labelKey: "nav.numerology" },
    { href: "/tarot", labelKey: "nav.tarot" },
    { href: "/fengshui", labelKey: "nav.fengshui" },
    { href: "/destiny", labelKey: "nav.destiny" },
    { href: "/compatibility", labelKey: "nav.compatibility" },
    { href: "/wedding-date", labelKey: "nav.weddingDate" },
    { href: "/store", labelKey: "nav.store" },
    // { href: "/community", labelKey: "nav.community" },
  ]

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
  }

  // Bỏ handleLanguageChange và languages array

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Bỏ logic cho langMenuRef
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Bỏ currentLang

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">BM</span>
            </div>
            <span className="text-xl font-bold text-yellow-500">{t("site.title")}</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 text-sm font-medium"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Bỏ khối div chứa language switcher */}

            {authIsLoading ? (
              <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            ) : isLoggedIn && user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-colors p-1 rounded-full hover:bg-gray-700/50"
                  aria-label={t("nav.profile")}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center ring-1 ring-yellow-600/50">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{user.name}</span>
                  {user.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
                  <ChevronDown className="w-4 h-4 opacity-70 hidden md:inline" />
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1.5 z-50"
                    >
                      <div className="px-3.5 py-2.5 border-b border-gray-700/70">
                        <p className="text-white font-semibold truncate">{user.name}</p>
                        <p className="text-gray-400 text-xs truncate">{user.email}</p>
                        {user.isPremium && (
                          <span className="inline-flex items-center space-x-1 text-yellow-400 text-xs mt-1 bg-yellow-500/10 px-1.5 py-0.5 rounded">
                            <Crown className="w-3 h-3" />
                            <span>{t("nav.premium")}</span>
                          </span>
                        )}
                      </div>
                      {[
                        { href: "/profile", labelKey: "nav.profile", icon: Settings },
                        { href: "/history", labelKey: "nav.history", icon: History },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm text-gray-200 hover:text-yellow-400 hover:bg-gray-800/70 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <item.icon className="w-4 h-4 opacity-80" />
                          <span>{t(item.labelKey)}</span>
                        </Link>
                      ))}
                      {!user.isPremium && (
                        <Link
                          href="/premium"
                          className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{t("nav.premium")}</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center space-x-2.5 px-3.5 py-2.5 text-sm text-gray-200 hover:text-red-400 hover:bg-red-500/10 transition-colors border-t border-gray-700/70 mt-1"
                      >
                        <LogOut className="w-4 h-4 opacity-80" />
                        <span>{t("auth.logout.title")}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-yellow-500 transition-colors px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-700/50"
                >
                  {t("auth.login.title")}
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-yellow-500 text-black px-4 py-1.5 rounded-full hover:bg-yellow-400 transition-colors text-sm font-semibold shadow-sm"
                >
                  {t("auth.register.title")}
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-300 hover:text-yellow-500 p-2 rounded-md hover:bg-gray-700/50"
              aria-label={isOpen ? t("common.close") : t("common.openMenu")}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800/70"
          >
            <div className="px-4 py-4 space-y-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-200 hover:text-yellow-400 hover:bg-gray-800/70 transition-colors py-2.5 px-3 rounded-md text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-700/70 space-y-1.5">
                {!isLoggedIn && !authIsLoading && (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-gray-200 hover:text-yellow-400 hover:bg-gray-800/70 transition-colors py-2.5 px-3 rounded-md text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("auth.login.title")}
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block bg-yellow-500 text-black px-4 py-2.5 rounded-full hover:bg-yellow-400 transition-colors text-center text-base font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("auth.register.title")}
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
