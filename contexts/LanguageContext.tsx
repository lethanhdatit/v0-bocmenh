"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { setLanguage as setServerLanguage } from "@/lib/languageActions"
import type { Locale } from "@/lib/i18n"
import { isValidLocale } from "@/lib/i18n"

interface LanguageContextType {
  language: Locale
  setLanguage: (lang: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      destiny: "Bóc Mệnh",
      dreams: "Giải Mơ",
      numerology: "Thần Số Học",
      tarot: "Tarot",
      fengshui: "Phong Thủy",
      compatibility: "Tương Hợp Tình Yêu",
      weddingDate: "Chọn Ngày Cưới",
      community: "Cộng Đồng",
      store: "Cửa Hàng",
      crystals: "Đá Quý Chữa Lành",
      meditation: "Hướng Dẫn Thiền",
      nameAnalysis: "Phân Tích Tên",
      businessName: "Tên Doanh Nghiệp",
      astrology: "Chiêm Tinh",
      palmistry: "Xem Tướng",
      horoscope: "Tử Vi",
    },
    auth: {
      login: "Đăng nhập",
      register: "Đăng ký",
      logout: "Đăng xuất",
      profile: "Hồ sơ cá nhân",
      history: "Lịch sử bói toán",
      premium: "Nâng cấp Premium",
    },
    site: {
      title: "Bóc Mệnh",
      tagline: "Mỗi người là một hộp bí ẩn, hãy khám phá - và bạn sẽ hiểu về chính mình",
      cta: "Bắt đầu khám phá",
      description: "Khám phá vận mệnh, giải mơ, thần số học và nhiều hơn nữa",
    },
    hero: {
      title: "Khám Phá Vận Mệnh Của Bạn",
      subtitle: "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình",
      cta: "Bắt đầu hành trình",
    },
    features: {
      title: "Các Tính Năng Nổi Bật",
      destiny: {
        title: "Bóc Mệnh Cá Nhân",
        description: "Khám phá vận mệnh của bạn qua ngày sinh và thông tin cá nhân",
      },
      dreams: {
        title: "Giải Mơ",
        description: "Khám phá ý nghĩa sâu sắc của giấc mơ đêm qua",
      },
      numerology: {
        title: "Thần Số Học",
        description: "Tìm hiểu con số may mắn và ý nghĩa cuộc đời",
      },
      tarot: {
        title: "Bói Tarot",
        description: "Rút thẻ Tarot để khám phá tương lai và định hướng",
      },
      fengshui: {
        title: "Phong Thủy",
        description: "Cải thiện vận khí và năng lượng sống",
      },
      compatibility: {
        title: "Tương Hợp Tình Yêu",
        description: "Kiểm tra độ hợp giữa hai người",
      },
    },
    luckyBox: {
      title: "Hộp May Mắn Hôm Nay",
      description: "Nhấn vào hộp để nhận số may mắn và lời nhắn đặc biệt",
      button: "Mở Hộp May Mắn",
      luckyNumber: "Số may mắn của bạn",
      message: "Lời nhắn",
      tryAgain: "Thử lại ngày mai",
    },
    common: {
      loading: "Đang tải...",
      submit: "Gửi",
      analyze: "Phân tích",
      results: "Kết quả",
      tryAgain: "Thử lại",
      getStarted: "Bắt đầu",
      learnMore: "Tìm hiểu thêm",
      back: "Quay lại",
      next: "Tiếp theo",
      save: "Lưu",
      cancel: "Hủy",
      confirm: "Xác nhận",
      error: "Có lỗi xảy ra",
      success: "Thành công",
    },
    destinyPage: {
      title: "Bóc Mệnh Cá Nhân",
      subtitle: "Nhập thông tin của bạn để khám phá vận mệnh, tính cách và con đường phía trước",
      metaTitle: "Bóc Mệnh Cá Nhân - Khám Phá Vận Mệnh Của Bạn",
      metaDescription: "Khám phá vận mệnh, tính cách và tương lai của bạn thông qua ngày sinh và thông tin cá nhân",
    },
    loginPage: {
      title: "Đăng Nhập",
      metaTitle: "Đăng Nhập - Bóc Mệnh",
      metaDescription: "Đăng nhập vào tài khoản Bóc Mệnh để trải nghiệm đầy đủ các tính năng khám phá vận mệnh",
    },
  },
  en: {
    nav: {
      home: "Home",
      destiny: "Destiny",
      dreams: "Dreams",
      numerology: "Numerology",
      tarot: "Tarot",
      fengshui: "Feng Shui",
      compatibility: "Love Compatibility",
      weddingDate: "Wedding Date",
      community: "Community",
      store: "Store",
      crystals: "Crystal Healing",
      meditation: "Meditation Guides",
      nameAnalysis: "Name Analysis",
      businessName: "Business Name",
      astrology: "Astrology",
      palmistry: "Palmistry",
      horoscope: "Horoscope",
    },
    auth: {
      login: "Login",
      register: "Register",
      logout: "Logout",
      profile: "Profile",
      history: "Reading History",
      premium: "Upgrade Premium",
    },
    site: {
      title: "Destiny Unveiling",
      tagline: "Each person is a mystery box, uncover it - and you'll understand yourself",
      cta: "Start Exploring",
      description: "Discover destiny, interpret dreams, numerology and much more",
    },
    hero: {
      title: "Discover Your Destiny",
      subtitle: "Each person is a mystery box, uncover it and you'll understand yourself",
      cta: "Start Your Journey",
    },
    features: {
      title: "Featured Services",
      destiny: {
        title: "Personal Destiny",
        description: "Discover your destiny through birth date and personal information",
      },
      dreams: {
        title: "Dream Interpretation",
        description: "Uncover the deep meaning of last night's dream",
      },
      numerology: {
        title: "Numerology",
        description: "Find your lucky numbers and life meaning",
      },
      tarot: {
        title: "Tarot Reading",
        description: "Draw Tarot cards to explore future and guidance",
      },
      fengshui: {
        title: "Feng Shui",
        description: "Improve luck and living energy",
      },
      compatibility: {
        title: "Love Compatibility",
        description: "Check compatibility between two people",
      },
    },
    luckyBox: {
      title: "Today's Lucky Box",
      description: "Click the box to receive your lucky number and special message",
      button: "Open Lucky Box",
      luckyNumber: "Your lucky number",
      message: "Message",
      tryAgain: "Try again tomorrow",
    },
    common: {
      loading: "Loading...",
      submit: "Submit",
      analyze: "Analyze",
      results: "Results",
      tryAgain: "Try Again",
      getStarted: "Get Started",
      learnMore: "Learn More",
      back: "Back",
      next: "Next",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      error: "An error occurred",
      success: "Success",
    },
    destinyPage: {
      title: "Personal Destiny",
      subtitle: "Enter your information to discover your destiny, personality and the path ahead",
      metaTitle: "Personal Destiny - Discover Your Fate",
      metaDescription: "Discover your destiny, personality and future through birth date and personal information",
    },
    loginPage: {
      title: "Login",
      metaTitle: "Login - Destiny Unveiling",
      metaDescription: "Login to your Destiny Unveiling account to experience all destiny exploration features",
    },
  },
}

export function LanguageProvider({
  children,
  initialLocale = "vi", // Add default value
}: {
  children: React.ReactNode
  initialLocale?: Locale // Make optional
}) {
  const [language, setLanguageState] = useState<Locale>(initialLocale)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Add safety check for pathname
  useEffect(() => {
    if (!pathname) return

    // Sync with URL locale
    const urlLocale = pathname.split("/")[1]
    if (isValidLocale && isValidLocale(urlLocale) && urlLocale !== language) {
      setLanguageState(urlLocale)
    }
  }, [pathname, language])

  const setLanguage = (lang: Locale) => {
    if (lang === language) return

    setIsLoading(true)

    // Update state immediately
    setLanguageState(lang)

    // Navigate to new locale URL
    const segments = pathname.split("/")
    segments[1] = lang // Replace locale segment
    const newPath = segments.join("/")

    router.push(newPath)

    // Save to server session in background
    setServerLanguage(lang)
      .catch((error) => {
        console.error("Failed to save language to server:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    if (typeof value !== "string") {
      return key
    }

    // Simple interpolation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
