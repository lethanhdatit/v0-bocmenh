"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(8);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const authContainerRef = useRef<HTMLDivElement>(null);
  const hiddenMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const {
    user,
    isLoggedIn,
    isLoading: authIsLoading,
    logout,
    openLoginModal,
    openRegisterModal,
  } = useAuth();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logout();
  };

  // Menu items in priority order (most important first)
  const navItems = [
    { href: "/luckybox", label: t("nav.luckybox") },
    { href: "/destiny", label: t("nav.destiny") },
    { href: "/dreams", label: t("nav.dreams") },
    { href: "/numerology", label: t("nav.numerology") },
    { href: "/tarot", label: t("nav.tarot") },
    { href: "/fengshui", label: t("nav.fengshui") },
    { href: "/store", label: t("nav.store") },
    { href: "/blogs", label: t("nav.blogs") },
  ];

  // Split items into visible and overflow
  const visibleItems = navItems.slice(0, visibleItemsCount);
  const overflowItems = navItems.slice(visibleItemsCount);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsOverflowMenuOpen(false);
  }, [pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest(".overflow-menu-container")) {
        setIsOverflowMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isOverflowMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isUserMenuOpen, isOverflowMenuOpen]);

  // Detect overflow and adjust visible items
  useEffect(() => {
    const checkOverflow = () => {
      if (
        !navContainerRef.current ||
        !logoContainerRef.current ||
        !authContainerRef.current ||
        !hiddenMenuRef.current
      ) {
        return;
      }

      const navContainer = navContainerRef.current;
      const logoContainer = logoContainerRef.current;
      const authContainer = authContainerRef.current;
      const hiddenMenu = hiddenMenuRef.current;

      // Get total available width
      const totalWidth = navContainer.offsetWidth;

      // Get fixed elements width
      const logoWidth = logoContainer.offsetWidth;
      const authWidth = authContainer.offsetWidth;

      // Account for gaps and padding - include space for overflow button
      const reservedSpace = logoWidth + authWidth + 100; // Include overflow button space

      // Available space for menu items (centered)
      const availableWidth = totalWidth - reservedSpace;

      // Get all menu items from hidden container to measure their actual width
      const hiddenItems = hiddenMenu.children;
      let totalMenuWidth = 0;
      let maxVisibleItems = 0;

      // Calculate how many items can fit with centered layout
      for (let i = 0; i < hiddenItems.length; i++) {
        const item = hiddenItems[i] as HTMLElement;
        const itemWidth = item.offsetWidth + 20; // 20px for gap

        if (totalMenuWidth + itemWidth <= availableWidth) {
          totalMenuWidth += itemWidth;
          maxVisibleItems = i + 1;
        } else {
          break;
        }
      }

      // Always show at least 3 items for centered layout, and don't exceed total items
      const newVisibleCount = Math.max(
        3,
        Math.min(maxVisibleItems, navItems.length)
      );

      if (newVisibleCount !== visibleItemsCount) {
        setVisibleItemsCount(newVisibleCount);
      }
    };

    // Delay initial check to ensure all elements are rendered
    const timeoutId = setTimeout(checkOverflow, 100);

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      // Debounce the check
      setTimeout(checkOverflow, 50);
    });

    if (navContainerRef.current) {
      resizeObserver.observe(navContainerRef.current);
    }

    // Also listen to window resize as fallback
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [visibleItemsCount, navItems.length, isLoggedIn, i18n.language, authIsLoading]);

  // Force recalculation when language changes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset to show all items first, then recalculate
      setVisibleItemsCount(navItems.length);

      // Trigger recalculation after a short delay
      setTimeout(() => {
        if (navContainerRef.current) {
          // Force a resize event to trigger recalculation
          window.dispatchEvent(new Event("resize"));
        }
      }, 50);
    }, 100);

    return () => clearTimeout(timer);
  }, [i18n.language, isLoggedIn, navItems.length]);

  // Auth Section Component
  const AuthSection = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (authIsLoading) {
      return (
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      );
    } else {
      if (isLoggedIn) {
        return (
          <div className="relative user-menu-container">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              aria-label={`User menu for ${user?.name || user?.email}`}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <User
                className={`flex-shrink-0 ${isMobile ? "w-5 h-5" : "w-5 h-5"}`}
                aria-hidden="true"
              />
              <span className="text-sm max-w-32 truncate">
                {user?.name || user?.email}
              </span>
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4" aria-hidden="true" />
                    <span>{t("nav.profile")}</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                  >
                    <Heart className="w-4 h-4" aria-hidden="true" />
                    <span>{t("nav.wishlist")}</span>
                  </Link>
                  <hr className="my-2 border-gray-700" role="separator" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-colors"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>{t("auth.logout.title")}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }

      return (
        <div
          className={`flex items-center ${
            isMobile ? "space-x-2" : "space-x-3"
          }`}
        >
          <button
            onClick={() => openLoginModal()}
            className={`${
              isMobile ? "text-xs" : "text-sm"
            } text-gray-300 hover:text-yellow-400 transition-colors whitespace-nowrap`}
            aria-label="Open login modal"
          >
            {isMobile
              ? t("auth.login.title") || "Đăng nhập"
              : t("auth.login.title")}
          </button>
          <button
            onClick={() => openRegisterModal()}
            className={`${
              isMobile ? "text-xs px-2 py-1" : "text-sm px-4 py-2"
            } bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-medium transition-colors whitespace-nowrap`}
            aria-label="Open register modal"
          >
            {isMobile
              ? t("auth.register.title") || "Đăng ký"
              : t("auth.register.title")}
          </button>
        </div>
      );
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/35 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={navContainerRef} className="flex items-center h-16">
          {/* Desktop Layout - Centered Menu */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Left: Logo + Slogan */}
            <div
              ref={logoContainerRef}
              className="flex items-center gap-3 flex-shrink-0 min-w-0"
            >
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="Bóc Mệnh - Về trang chủ"
              >
                <img
                  src="/logo.png"
                  alt="Bóc Mệnh Logo - Khám phá vận mệnh của bạn"
                  className="h-10 w-auto sm:h-11 lg:h-12 object-contain"
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

            {/* Center: Navigation Menu with Overflow */}
            <div className="flex-1 flex justify-center items-center min-w-0 mx-1">
              <div className="flex items-center">
                {/* Visible Menu Items */}
                <ul
                  className="flex items-center space-x-4 lg:space-x-6"
                  role="menubar"
                >
                  {visibleItems.map((item) => (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-yellow-400 whitespace-nowrap ${
                          pathname === item.href
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        role="menuitem"
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Overflow Menu - Positioned right after visible items */}
                {overflowItems.length > 0 && (
                  <div className="overflow-menu-container relative ml-2">
                    <button
                      onClick={() => setIsOverflowMenuOpen(!isOverflowMenuOpen)}
                      className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition-colors px-2 py-1 rounded-md hover:bg-gray-800/50"
                      aria-label="More navigation options"
                      aria-expanded={isOverflowMenuOpen}
                      aria-haspopup="true"
                    >
                      <span className="text-sm font-medium">
                        {t("nav.morebtn")}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOverflowMenuOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {isOverflowMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          {overflowItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block px-4 py-2 text-sm transition-colors hover:text-yellow-400 hover:bg-gray-800 ${
                                pathname === item.href
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setIsOverflowMenuOpen(false)}
                              role="menuitem"
                              aria-current={
                                pathname === item.href ? "page" : undefined
                              }
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Auth */}
            <div ref={authContainerRef} className="flex-shrink-0">
              <AuthSection isMobile={false} />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Logo + Slogan Container */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="Bóc Mệnh - Về trang chủ"
              >
                <img
                  src="/logo.png"
                  alt="Bóc Mệnh Logo"
                  className="h-10 w-auto object-contain"
                  width="32"
                  height="32"
                />
              </Link>
              <Link
                href="/"
                className="flex-shrink-1 min-w-0 overflow-hidden"
                aria-label="Bóc Mệnh"
              >
                <img
                  src="/slogan.png"
                  alt="Bóc Mệnh"
                  className="h-5 w-auto object-contain transition-all duration-300"
                  style={{
                    minWidth: "40px",
                    maxWidth: "120px",
                    width: "clamp(40px, 20vw, 120px)",
                  }}
                  width="120"
                  height="20"
                />
              </Link>
            </div>

            {/* Mobile Auth + Toggle */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <AuthSection isMobile={true} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden menu for measurement - invisible but rendered */}
      <div
        ref={hiddenMenuRef}
        className="absolute -top-96 left-0 opacity-0 pointer-events-none flex items-center space-x-4 lg:space-x-6"
        aria-hidden="true"
      >
        {navItems.map((item) => (
          <span
            key={item.href}
            className="text-sm font-medium whitespace-nowrap"
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/20"
            id="mobile-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <nav className="px-4 py-4 space-y-4" role="none">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-sm font-medium transition-colors hover:text-yellow-400 ${
                    pathname === item.href ? "text-yellow-400" : "text-gray-300"
                  }`}
                  role="menuitem"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
