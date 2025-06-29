"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User, LogOut, Settings, Heart } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isLoggedIn, isLoading: authIsLoading, logout, openLoginModal, openRegisterModal } = useAuth()
  const { t } = useTranslation()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    setIsUserMenuOpen(false)
    await logout()
  }

  const navItems = [
    { href: "/destiny", label: t("nav.destiny") },
    { href: "/dreams", label: t("nav.dreams") },
    { href: "/numerology", label: t("nav.numerology") },
    { href: "/tarot", label: t("nav.tarot") },
    { href: "/fengshui", label: t("nav.fengshui") },
    { href: "/store", label: t("nav.store") },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Bóc Mệnh Logo" className="h-10 w-auto" />
              <img src="/slogan.png" alt="Bóc Mệnh Slogan" className="h-6 w-auto hidden sm:block" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  pathname.startsWith(item.href) ? "text-primary" : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end space-x-4">
            {authIsLoading ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2">
                  <User className="w-5 h-5 text-foreground/80" />
                  <span className="text-sm font-semibold max-w-24 truncate">{user?.name || user?.email}</span>
                </button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" /> {t("nav.profile")}
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="w-4 h-4" /> {t("nav.wishlist")}
                      </Link>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted"
                      >
                        <LogOut className="w-4 h-4" /> {t("auth.logout.title")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
                >
                  {t("auth.login.title")}
                </button>
                <button
                  onClick={openRegisterModal}
                  className="px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  {t("auth.register.title")}
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              <Menu className="w-6 h-6" />
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
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.profile")}
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.wishlist")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-muted"
                    >
                      {t("auth.logout.title")}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        openLoginModal()
                        setIsOpen(false)
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
                    >
                      {t("auth.login.title")}
                    </button>
                    <button
                      onClick={() => {
                        openRegisterModal()
                        setIsOpen(false)
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {t("auth.register.title")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
