"use client";

import { useEffect, useRef, useState } from "react";
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
  CreditCard,
  FileText,
  Globe,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useMyFates } from "@/contexts/MyFatesContext";
import { formatShortNumber } from "@/lib/infra/utils";
import { useTopupWindow } from "@/hooks/use-topup-window";
import { FatesUnit } from "@/components/common/FatesUnit";
import { useLayoutVisibility } from "@/contexts/LayoutVisibilityContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ComingSoonNavBadge,
  MaintenanceNavBadge,
} from "@/components/features/ComingSoonBadge";
import { useFeature } from "@/lib/features/use-feature";
import { BADGE_CONFIG } from "@/lib/features/badge-config";
import type {
  BadgePosition,
  BadgeSize,
  BadgeDistance,
} from "@/lib/features/badge-config";

export default function Navigation() {
  const { showNav } = useLayoutVisibility();
  if (!showNav) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [showFatesTooltip, setShowFatesTooltip] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);
  const pathname = usePathname();
  const {
    user,
    isLoggedIn,
    isLoading: authIsLoading,
    logout,
    openLoginModal,
    openRegisterModal,
  } = useAuth();
  const { t } = useTranslation();
  const { myFates } = useMyFates();
  const {
    language,
    setLanguage,
    isLoading: langIsLoading,
    availableLanguages,
  } = useLanguage();
  const [displayFates, setDisplayFates] = useState(myFates ?? 0);
  const [animating, setAnimating] = useState(false);
  const prevFatesRef = useRef(myFates ?? 0);
  const animationFrameRef = useRef<number | null>(null);
  const { openTopup } = useTopupWindow();

  // Navigation items ordered by priority (highest to lowest)
  const allNavItems = [
    { href: "/destiny", label: t("nav.destiny") },
    { href: "/dreams", label: t("nav.dreams") },
    { href: "/numerology", label: t("nav.numerology") },
    { href: "/tarot", label: t("nav.tarot") },
    { href: "/fengshui", label: t("nav.fengshui") },
    { href: "/luckybox", label: t("nav.luckybox") },
    { href: "/store", label: t("nav.store") },
  ];

  // Determine which items to show based on screen size
  const getVisibleItems = () => {
    // For different screen sizes with iPad and Nest Hub considerations:
    // XL (1280px+): Show all 7 items
    // LG (1024px-1279px): Show 5 items (iPad Pro landscape, Nest Hub)
    // MD-Large (900px-1023px): Show 4 items (iPad landscape)
    // MD (768px-899px): Show 3 items (iPad Mini, iPad portrait)
    // SM: Mobile menu
    
    const xlVisible = allNavItems; // All 7 items
    const xlMore: { href: string; label: string }[] = [];

    const lgVisible = allNavItems.slice(0, 5); // 5 items for iPad Pro/Nest Hub
    const lgMore = allNavItems.slice(5);

    const mdLargeVisible = allNavItems.slice(0, 4); // 4 items for medium tablets
    const mdLargeMore = allNavItems.slice(4);

    const mdVisible = allNavItems.slice(0, 3); // 3 items for iPad Mini
    const mdMore = allNavItems.slice(3);

    return { xlVisible, xlMore, lgVisible, lgMore, mdLargeVisible, mdLargeMore, mdVisible, mdMore };
  };

  const { xlVisible, xlMore, lgVisible, lgMore, mdLargeVisible, mdLargeMore, mdVisible, mdMore } =
    getVisibleItems();
    getVisibleItems();

  // Component for navigation items with coming soon and maintenance support
  const NavItem = ({
    item,
    className = "",
    onClick = () => {},
    role = "menuitem",
    badgePosition = BADGE_CONFIG.navigation.position,
    badgeSize = BADGE_CONFIG.navigation.size,
    badgeDistance = BADGE_CONFIG.navigation.distance,
  }: {
    item: { href: string; label: string };
    className?: string;
    onClick?: () => void;
    role?: string;
    badgePosition?: BadgePosition;
    badgeSize?: BadgeSize;
    badgeDistance?: BadgeDistance;
  }) => {
    const { isComingSoon, isMaintenance } = useFeature(item.href);
    const isDisabled = isComingSoon || isMaintenance;

    // Dynamic padding based on badge position and distance
    const getPadding = () => {
      if (!isDisabled) return "";

      const paddingMap = {
        near: {
          "top-right": "pr-2 pt-0.5",
          "top-center": "pt-0.5",
          "top-left": "pl-2 pt-0.5",
          "bottom-right": "pr-2 pb-0.5",
          "bottom-center": "pb-0.5",
          "bottom-left": "pl-2 pb-0.5",
          "inline-left": "pl-2",
          "inline-center": "",
          "inline-right": "pr-2",
        },
        normal: {
          "top-right": "pr-3 pt-1",
          "top-center": "pt-1",
          "top-left": "pl-3 pt-1",
          "bottom-right": "pr-3 pb-1",
          "bottom-center": "pb-1",
          "bottom-left": "pl-3 pb-1",
          "inline-left": "pl-3",
          "inline-center": "",
          "inline-right": "pr-3",
        },
        far: {
          "top-right": "pr-4 pt-1.5",
          "top-center": "pt-1.5",
          "top-left": "pl-4 pt-1.5",
          "bottom-right": "pr-4 pb-1.5",
          "bottom-center": "pb-1.5",
          "bottom-left": "pl-4 pb-1.5",
          "inline-left": "pl-4",
          "inline-center": "",
          "inline-right": "pr-4",
        },
      };

      return paddingMap[badgeDistance][badgePosition];
    };

    return (
      <Link
        href={item.href}
        className={`group ${className} ${
          isDisabled ? "pointer-events-none opacity-60" : ""
        }`}
        role={role}
        onClick={onClick}
        aria-current={pathname === item.href ? "page" : undefined}
      >
        <span className={`relative inline-block ${getPadding()}`}>
          {item.label}
          {isComingSoon && (
            <ComingSoonNavBadge
              position={badgePosition}
              size={badgeSize}
              distance={badgeDistance}
            />
          )}
          {isMaintenance && (
            <MaintenanceNavBadge
              position={badgePosition}
              size={badgeSize}
              distance={badgeDistance}
            />
          )}
        </span>
      </Link>
    );
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logout();
  };

  const handleLanguageChange = (lang: typeof language) => {
    setShowLanguageMenu(false);
    setIsUserMenuOpen(false);
    setLanguage(lang);
  };

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsMoreMenuOpen(false);
    setShowLanguageMenu(false);
  }, [pathname]);

  useEffect(() => {
    setLogoSpin(true);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Don't close user menu if clicking inside language menu
      const isLanguageMenuClick = target.closest(".language-menu-container");
      const isUserMenuClick = target.closest(".user-menu-container");
      
      // Close language menu if clicking outside of it (but not inside user menu)
      if (!isLanguageMenuClick) {
        setShowLanguageMenu(false);
      }
      
      // Close user menu only if clicking completely outside both user menu and language menu
      if (!isUserMenuClick) {
        setIsUserMenuOpen(false);
        setShowLanguageMenu(false);
      }
      
      if (!target.closest(".more-menu-container")) {
        setIsMoreMenuOpen(false);
      }
      if (!target.closest(".fates-tooltip") && !target.closest(".fates-badge")) {
        setShowFatesTooltip(false);
      }
    };

    if (isUserMenuOpen || isMoreMenuOpen || showFatesTooltip || showLanguageMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isUserMenuOpen, isMoreMenuOpen, showFatesTooltip, showLanguageMenu]);

  useEffect(() => {
    if (showFatesTooltip) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowFatesTooltip(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [showFatesTooltip]);

  // MyFates animation logic
  useEffect(() => {
    if (myFates == null || myFates === prevFatesRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const start = prevFatesRef.current;
    const end = myFates;
    const duration = 900; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    function easeOutExpo(x: number) {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function animateCounter() {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = easeOutExpo(progress);
      const value = Math.round(start + (end - start) * eased);
      setDisplayFates(value);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCounter);
      } else {
        setDisplayFates(end);
        prevFatesRef.current = end;
        animationFrameRef.current = null;

        setAnimating(true);
        const zoomTimeout = setTimeout(() => {
          setAnimating(false);
        }, 650);

        return () => clearTimeout(zoomTimeout);
      }
    }

    animateCounter();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [myFates]);

  // Auth Section Component
  const AuthSection = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (authIsLoading) {
      return (
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      );
    }

    if (isLoggedIn) {
      return (
        <div className="relative user-menu-container flex items-center">
          {/* MyFates badge */}
          <span
            className="fates-badge flex items-center gap-1 text-xs font-semibold text-yellow-700 rounded-full mr-3 px-1 py-0.5 min-w-[48px] justify-center cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={
              myFates !== null && myFates !== 0
                ? myFates.toLocaleString()
                : "--"
            }
            title={t("checkout.fates")}
            onClick={(e) => {
              e.stopPropagation();
              setShowFatesTooltip(true);
            }}
            onMouseEnter={() => setShowFatesTooltip(true)}
          >
            <span className="flex items-center gap-2">
              <span
                className={`font-bold text-yellow-400 transition-all duration-300 ${
                  animating ? "scale-110" : "scale-100"
                }`}
              >
                {myFates !== null ? formatShortNumber(displayFates) : "--"}
              </span>
              <FatesUnit
                type="icon"
                width={14}
                height={14}
                text={t("topups.fatesUnit")}
                className="flex-shrink-0"
              />
            </span>
          </span>

          {/* Tooltip */}
          {showFatesTooltip && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-3 text-gray-800 text-sm fates-tooltip"
              style={{ minWidth: 248 }}
            >
              <button
                className="absolute top-1 right-3 text-gray-400 hover:text-red-500 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFatesTooltip(false);
                }}
                aria-label="Đóng"
                tabIndex={0}
              >
                ×
              </button>
              <div className="mb-2 flex items-center gap-1 justify-start min-w-0 w-full">
                <span className="text-yellow-600 font-semibold text-sm">
                  {myFates !== null ? myFates : "--"}
                </span>
                <FatesUnit
                  type="icon"
                  width={14}
                  height={14}
                  text={t("topups.fatesUnit")}
                  className="flex-shrink-0 cursor-pointer"
                />
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFatesTooltip(false);
                    openTopup();
                  }}
                  className="flex-1 rounded bg-yellow-500 hover:bg-yellow-400 hover:text-black text-white text-xs font-semibold transition-colors"
                >
                  {t("topups.buyMore")}
                </button>
                <Link
                  href="/topups"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium py-1 px-3 rounded transition-colors text-center"
                >
                  {t("topups.seePackages")}
                </Link>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition-colors"
            aria-label={`User menu for ${user?.name || user?.email}`}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            type="button"
          >
            <User
              className={`flex-shrink-0 ${isMobile ? "w-5 h-5" : "w-5 h-5"}`}
              aria-hidden="true"
            />
            <span
              title={user?.name || user?.email}
              className={`text-sm truncate ${
                isMobile ? "max-w-16 xs:max-w-18 sm:max-w-20" : "max-w-24"
              }`}
            >
              {user?.name || user?.email}
            </span>
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 min-w-[180px] w-max bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50 max-h-[80vh] overflow-auto"
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
                  href="/topups-history"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                >
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  <span>{t("nav.topupsHistory")}</span>
                </Link>
                <Link
                  href="/services-history"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                  role="menuitem"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>{t("nav.servicesHistory")}</span>
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
                
                {/* Language Selector */}
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <div className="language-menu-container relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLanguageMenu(!showLanguageMenu);
                      }}
                      disabled={langIsLoading}
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-colors disabled:opacity-50 rounded-md"
                      role="menuitem"
                    >
                      <div className="flex items-center space-x-2">
                        {langIsLoading ? (
                          <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Globe className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span className="text-left">
                          {availableLanguages.find((l) => l.code === language)?.flag} {availableLanguages.find((l) => l.code === language)?.name}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showLanguageMenu ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {showLanguageMenu && !langIsLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 bottom-full mb-1 w-44 bg-black border border-gray-600 rounded-lg shadow-xl py-1.5 z-[70]"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          {availableLanguages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLanguageChange(lang.code as typeof language);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-sm transition-colors flex items-center space-x-2.5 ${
                                language === lang.code
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : "text-gray-200 hover:text-yellow-400 hover:bg-gray-800/70"
                              }`}
                              role="menuitem"
                            >
                              <span className="text-lg">{lang.flag}</span>
                              <span className="flex-1">{lang.name}</span>
                              {language === lang.code && (
                                <span className="text-yellow-500 ml-auto">✓</span>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

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
      <div className="flex items-center space-x-1">
        {/* Language Selector for Guest Users */}
        <div className="language-menu-container relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLanguageMenu(!showLanguageMenu);
            }}
            disabled={langIsLoading}
            className={`flex items-center space-x-1 ${
              isMobile ? "text-xs p-1" : "text-sm p-1.5"
            } text-gray-300 hover:text-yellow-400 transition-colors rounded-md hover:bg-gray-800/50 disabled:opacity-50`}
            aria-label={t("nav.language")}
          >
            {langIsLoading ? (
              <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {availableLanguages.find((l) => l.code === language) && !langIsLoading && (
              <span className={`${isMobile ? "hidden" : "hidden sm:inline text-xs"}`}>
                {availableLanguages.find((l) => l.code === language)?.flag}
              </span>
            )}
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          <AnimatePresence>
            {showLanguageMenu && !langIsLoading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute ${
                  isMobile ? "right-0" : "right-0"
                } top-full mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-1.5 z-50`}
                role="menu"
                aria-orientation="vertical"
              >
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code as typeof language);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center space-x-2 ${
                      language === lang.code
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "text-gray-200 hover:text-yellow-400 hover:bg-gray-800/70"
                    }`}
                    role="menuitem"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="flex-1">{lang.name}</span>
                    {language === lang.code && (
                      <span className="text-yellow-500 ml-auto">✓</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => openLoginModal()}
          className={`${
            isMobile ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5"
          } text-gray-300 hover:text-yellow-400 transition-colors whitespace-nowrap rounded-md hover:bg-gray-800/50`}
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
  };

  // Check if current path is in any of the "More" menu items for different screen sizes
  const isMoreSelected =
    isMoreMenuOpen ||
    mdMore.some((item) => item.href === pathname) ||
    mdLargeMore.some((item) => item.href === pathname) ||
    lgMore.some((item) => item.href === pathname) ||
    xlMore.some((item) => item.href === pathname);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/55 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Desktop Layout - CSS Grid approach */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:gap-4 lg:gap-6 xl:gap-8 items-center w-full">
            {/* Left: Logo + Slogan - Smart responsive display */}
            <div className="flex items-center gap-1.5 min-w-0">
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="Bóc Mệnh - Về trang chủ"
              >
                <img
                  src="/logo.png"
                  alt="Bóc Mệnh Logo"
                  className={`h-9 lg:h-10 xl:h-11 w-auto object-contain transition-transform duration-700 ${
                    logoSpin ? "animate-spin-slow" : ""
                  }`}
                />
              </Link>
              <Link
                href="/"
                className="flex-shrink min-w-[60px] hidden min-[800px]:block"
                aria-label="Bóc Mệnh"
              >
                <img
                  src="/slogan.png"
                  alt="Bóc Mệnh - Mỗi người là một hộp bí ẩn"
                  className="h-4 lg:h-5 xl:h-6 w-auto"
                  style={{
                    minWidth: "60px",
                    maxWidth: "140px",
                  }}
                />
              </Link>
            </div>

            {/* Center: Dynamic Navigation based on screen size */}
            <div className="flex justify-center items-center min-w-0">
              <nav className="flex items-center" role="menubar">
                {/* XL (1280px+): Show all 7 items */}
                <div className="hidden xl:flex items-center space-x-6">
                  {xlVisible.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      className={`text-sm font-medium transition-colors hover:text-yellow-400 whitespace-nowrap ${
                        pathname === item.href
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* LG (1024px-1279px): Show 5 items - iPad Pro/Nest Hub */}
                <div className="hidden lg:flex xl:hidden items-center space-x-4">
                  {lgVisible.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      className={`text-sm font-medium transition-colors hover:text-yellow-400 whitespace-nowrap ${
                        pathname === item.href
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* MD-Large (900px-1023px): Show 4 items - Medium tablets */}
                <div className="hidden min-[900px]:flex lg:hidden items-center space-x-3">
                  {mdLargeVisible.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      className={`text-sm font-medium transition-colors hover:text-yellow-400 whitespace-nowrap ${
                        pathname === item.href
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* MD (768px-899px): Show 3 items - iPad Mini */}
                <div className="hidden md:flex min-[900px]:hidden items-center space-x-3">
                  {mdVisible.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      className={`text-sm font-medium transition-colors hover:text-yellow-400 whitespace-nowrap ${
                        pathname === item.href
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* More Menu - Show remaining items */}
                <div className="more-menu-container relative ml-3 lg:ml-4 xl:ml-6">
                  {/* XL: Show More button if needed */}
                  <div className="hidden xl:block">
                    {xlMore.length > 0 && (
                      <button
                        onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                          isMoreSelected
                            ? "text-yellow-400 bg-gray-800/50"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                        }`}
                        aria-label="More navigation options"
                        aria-expanded={isMoreMenuOpen}
                        aria-haspopup="true"
                      >
                        <span className="text-sm font-medium">
                          {t("nav.morebtn")}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isMoreMenuOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {/* LG: Show More button for remaining items */}
                  <div className="hidden lg:block xl:hidden">
                    {lgMore.length > 0 && (
                      <button
                        onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                          isMoreSelected
                            ? "text-yellow-400 bg-gray-800/50"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                        }`}
                        aria-label="More navigation options"
                        aria-expanded={isMoreMenuOpen}
                        aria-haspopup="true"
                      >
                        <span className="text-sm font-medium">
                          {t("nav.morebtn")}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isMoreMenuOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {/* MD-Large: Show More button for remaining items */}
                  <div className="hidden min-[900px]:block lg:hidden">
                    {mdLargeMore.length > 0 && (
                      <button
                        onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                        className={`flex items-center space-x-1 px-2 py-2 rounded-md transition-colors ${
                          isMoreSelected
                            ? "text-yellow-400 bg-gray-800/50"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                        }`}
                        aria-label="More navigation options"
                        aria-expanded={isMoreMenuOpen}
                        aria-haspopup="true"
                      >
                        <span className="text-sm font-medium">
                          {t("nav.morebtn")}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isMoreMenuOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {/* MD: Show More button for remaining items */}
                  <div className="hidden md:block min-[900px]:hidden">
                    {mdMore.length > 0 && (
                      <button
                        onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                        className={`flex items-center space-x-1 px-2 py-2 rounded-md transition-colors ${
                          isMoreSelected
                            ? "text-yellow-400 bg-gray-800/50"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                        }`}
                        aria-label="More navigation options"
                        aria-expanded={isMoreMenuOpen}
                        aria-haspopup="true"
                      >
                        <span className="text-sm font-medium">
                          {t("nav.morebtn")}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isMoreMenuOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {isMoreMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {/* XL More items */}
                        <div className="xl:block hidden">
                          {xlMore.map((item) => (
                            <NavItem
                              key={item.href}
                              item={item}
                              className={`block px-4 py-2 text-sm transition-colors hover:text-yellow-400 hover:bg-gray-800 ${
                                pathname === item.href
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setIsMoreMenuOpen(false)}
                            />
                          ))}
                        </div>

                        {/* LG More items */}
                        <div className="lg:block xl:hidden hidden">
                          {lgMore.map((item) => (
                            <NavItem
                              key={item.href}
                              item={item}
                              className={`block px-4 py-2 text-sm transition-colors hover:text-yellow-400 hover:bg-gray-800 ${
                                pathname === item.href
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setIsMoreMenuOpen(false)}
                            />
                          ))}
                        </div>

                        {/* MD-Large More items */}
                        <div className="min-[900px]:block lg:hidden hidden">
                          {mdLargeMore.map((item) => (
                            <NavItem
                              key={item.href}
                              item={item}
                              className={`block px-4 py-2 text-sm transition-colors hover:text-yellow-400 hover:bg-gray-800 ${
                                pathname === item.href
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setIsMoreMenuOpen(false)}
                            />
                          ))}
                        </div>

                        {/* MD More items */}
                        <div className="md:block min-[900px]:hidden hidden">
                          {mdMore.map((item) => (
                            <NavItem
                              key={item.href}
                              item={item}
                              className={`block px-4 py-2 text-sm transition-colors hover:text-yellow-400 hover:bg-gray-800 ${
                                pathname === item.href
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setIsMoreMenuOpen(false)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            {/* Right: Auth */}
            <div className="flex justify-end min-w-0">
              <AuthSection isMobile={false} />
            </div>
          </div>

          {/* Mobile Layout - Toggle + Logo+Slogan unified left block */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Left: Toggle + Logo + Slogan as unified block */}
            <div className="flex items-center gap-2 xs:gap-2.5 min-w-0">
              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-yellow-400 transition-colors flex-shrink-0"
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {/* Logo + Slogan Container with smart overflow handling */}
              <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                <Link
                  href="/"
                  className="flex-shrink-0 min-w-0 hidden min-[280px]:block"
                  aria-label="Bóc Mệnh - Về trang chủ"
                >
                  <img
                    src="/logo.png"
                    alt="Bóc Mệnh Logo"
                    className={`w-auto object-contain transition-transform duration-700 ${
                      logoSpin ? "animate-spin-slow" : ""
                    }`}
                    style={{
                      height: "clamp(24px, 8vw, 40px)",
                      minHeight: "24px",
                      maxHeight: "40px",
                      minWidth: "24px",
                      maxWidth: "40px",
                    }}
                  />
                </Link>
                <Link
                  href="/"
                  className="flex-shrink min-w-0 overflow-hidden hidden xs:block sm:block"
                  aria-label="Bóc Mệnh"
                >
                  <img
                    src="/slogan.png"
                    alt="Bóc Mệnh"
                    className="h-3 xs:h-4 sm:h-5 w-auto object-contain"
                    style={{
                      minWidth: "30px",
                      maxWidth: "90px",
                      width: "clamp(35px, 18vw, 90px)",
                    }}
                  />
                </Link>
              </div>
            </div>

            {/* Right: Mobile Auth */}
            <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0">
              <AuthSection isMobile={true} />
            </div>
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
            id="mobile-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <nav className="px-4 py-4 space-y-3" role="none">
              {/* All navigation items in priority order */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-yellow-500 uppercase tracking-wide px-2 mb-3">
                  {t("nav.menu") || "Menu"}
                </h3>
                {allNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      pathname === item.href
                        ? "text-yellow-400 bg-gray-800/50"
                        : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Mobile Language Selector */}
              <div className="border-t border-gray-700 pt-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-3">
                  {t("nav.language")}
                </h3>
                <div className="language-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLanguageMenu(!showLanguageMenu);
                    }}
                    disabled={langIsLoading}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-2">
                      {langIsLoading ? (
                        <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Globe className="w-5 h-5" />
                      )}
                      <span>
                        {availableLanguages.find((l) => l.code === language)?.flag} {availableLanguages.find((l) => l.code === language)?.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showLanguageMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showLanguageMenu && !langIsLoading && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-1"
                      >
                        {availableLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLanguageChange(lang.code as typeof language);
                              setIsOpen(false);
                            }}
                            className={`w-full text-left px-6 py-2 text-sm transition-colors flex items-center space-x-2.5 rounded-md ${
                              language === lang.code
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50"
                            }`}
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="flex-1">{lang.name}</span>
                            {language === lang.code && (
                              <span className="text-yellow-500 text-sm ml-auto">✓</span>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
