"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { setLanguage as setServerLanguage, getLanguage as getServerLanguage } from "@/lib/languageActions"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.destiny": "Bóc Mệnh",
    "nav.dreams": "Giải Mơ",
    "nav.numerology": "Thần Số Học",
    "nav.tarot": "Tarot",
    "nav.fengshui": "Phong Thủy",
    "nav.compatibility": "Tương Hợp Tình Yêu",
    "nav.weddingDate": "Chọn Ngày Cưới",
    "nav.community": "Cộng Đồng",
    "nav.store": "Cửa Hàng",
    "nav.crystals": "Đá Quý Chữa Lành",
    "nav.meditation": "Hướng Dẫn Thiền",
    "nav.nameAnalysis": "Phân Tích Tên",
    "nav.businessName": "Tên Doanh Nghiệp",
    "nav.astrology": "Chiêm Tinh",
    "nav.palmistry": "Xem Tướng",
    "nav.horoscope": "Tử Vi",

    // Auth
    "auth.login": "Đăng nhập",
    "auth.register": "Đăng ký",
    "auth.logout": "Đăng xuất",
    "auth.profile": "Hồ sơ cá nhân",
    "auth.history": "Lịch sử bói toán",
    "auth.premium": "Nâng cấp Premium",

    // Site
    "site.title": "Bóc Mệnh",
    "site.tagline": "Mỗi người là một hộp bí ẩn, hãy khám phá - và bạn sẽ hiểu về chính mình",
    "site.cta": "Bắt đầu khám phá",
    "site.description": "Khám phá vận mệnh, giải mơ, thần số học và nhiều hơn nữa",

    // Hero Section
    "hero.title": "Khám Phá Vận Mệnh Của Bạn",
    "hero.subtitle": "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình",
    "hero.cta": "Bắt đầu hành trình",

    // Features
    "features.title": "Các Tính Năng Nổi Bật",
    "features.destiny.title": "Bóc Mệnh Cá Nhân",
    "features.destiny.description": "Khám phá vận mệnh của bạn qua ngày sinh và thông tin cá nhân",
    "features.dreams.title": "Giải Mơ",
    "features.dreams.description": "Khám phá ý nghĩa sâu sắc của giấc mơ đêm qua",
    "features.numerology.title": "Thần Số Học",
    "features.numerology.description": "Tìm hiểu con số may mắn và ý nghĩa cuộc đời",
    "features.tarot.title": "Bói Tarot",
    "features.tarot.description": "Rút thẻ Tarot để khám phá tương lai và định hướng",
    "features.fengshui.title": "Phong Thủy",
    "features.fengshui.description": "Cải thiện vận khí và năng lượng sống",
    "features.compatibility.title": "Tương Hợp Tình Yêu",
    "features.compatibility.description": "Kiểm tra độ hợp giữa hai người",

    // Lucky Box
    "luckyBox.title": "Hộp May Mắn Hôm Nay",
    "luckyBox.description": "Nhấn vào hộp để nhận số may mắn và lời nhắn đặc biệt",
    "luckyBox.button": "Mở Hộp May Mắn",
    "luckyBox.luckyNumber": "Số may mắn của bạn",
    "luckyBox.message": "Lời nhắn",
    "luckyBox.tryAgain": "Thử lại ngày mai",

    // Common
    "common.loading": "Đang tải...",
    "common.submit": "Gửi",
    "common.analyze": "Phân tích",
    "common.results": "Kết quả",
    "common.tryAgain": "Thử lại",
    "common.getStarted": "Bắt đầu",
    "common.learnMore": "Tìm hiểu thêm",
    "common.back": "Quay lại",
    "common.next": "Tiếp theo",
    "common.save": "Lưu",
    "common.cancel": "Hủy",
    "common.confirm": "Xác nhận",
    "common.error": "Có lỗi xảy ra",
    "common.success": "Thành công",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.destiny": "Destiny",
    "nav.dreams": "Dreams",
    "nav.numerology": "Numerology",
    "nav.tarot": "Tarot",
    "nav.fengshui": "Feng Shui",
    "nav.compatibility": "Love Compatibility",
    "nav.weddingDate": "Wedding Date",
    "nav.community": "Community",
    "nav.store": "Store",
    "nav.crystals": "Crystal Healing",
    "nav.meditation": "Meditation Guides",
    "nav.nameAnalysis": "Name Analysis",
    "nav.businessName": "Business Name",
    "nav.astrology": "Astrology",
    "nav.palmistry": "Palmistry",
    "nav.horoscope": "Horoscope",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.logout": "Logout",
    "auth.profile": "Profile",
    "auth.history": "Reading History",
    "auth.premium": "Upgrade Premium",

    // Site
    "site.title": "Destiny Unveiling",
    "site.tagline": "Each person is a mystery box, uncover it - and you'll understand yourself",
    "site.cta": "Start Exploring",
    "site.description": "Discover destiny, interpret dreams, numerology and much more",

    // Hero Section
    "hero.title": "Discover Your Destiny",
    "hero.subtitle": "Each person is a mystery box, uncover it and you'll understand yourself",
    "hero.cta": "Start Your Journey",

    // Features
    "features.title": "Featured Services",
    "features.destiny.title": "Personal Destiny",
    "features.destiny.description": "Discover your destiny through birth date and personal information",
    "features.dreams.title": "Dream Interpretation",
    "features.dreams.description": "Uncover the deep meaning of last night's dream",
    "features.numerology.title": "Numerology",
    "features.numerology.description": "Find your lucky numbers and life meaning",
    "features.tarot.title": "Tarot Reading",
    "features.tarot.description": "Draw Tarot cards to explore future and guidance",
    "features.fengshui.title": "Feng Shui",
    "features.fengshui.description": "Improve luck and living energy",
    "features.compatibility.title": "Love Compatibility",
    "features.compatibility.description": "Check compatibility between two people",

    // Lucky Box
    "luckyBox.title": "Today's Lucky Box",
    "luckyBox.description": "Click the box to receive your lucky number and special message",
    "luckyBox.button": "Open Lucky Box",
    "luckyBox.luckyNumber": "Your lucky number",
    "luckyBox.message": "Message",
    "luckyBox.tryAgain": "Try again tomorrow",

    // Common
    "common.loading": "Loading...",
    "common.submit": "Submit",
    "common.analyze": "Analyze",
    "common.results": "Results",
    "common.tryAgain": "Try Again",
    "common.getStarted": "Get Started",
    "common.learnMore": "Learn More",
    "common.back": "Back",
    "common.next": "Next",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.error": "An error occurred",
    "common.success": "Success",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Always prioritize localStorage first
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }

    // Only sync with server if we have a valid session
    const syncWithServer = async () => {
      try {
        const { language: serverLanguage, hasSession } = await getServerLanguage()

        // Only override localStorage if:
        // 1. We have a valid session
        // 2. Server language is different from localStorage
        // 3. We don't have localStorage language set
        if (hasSession && serverLanguage && (!savedLanguage || serverLanguage !== savedLanguage)) {
          setLanguageState(serverLanguage)
          localStorage.setItem("language", serverLanguage)
        }
      } catch (error) {
        console.error("Failed to sync language with server:", error)
        // Don't change anything if server sync fails
      }
    }

    // Delay server sync to avoid blocking initial render
    setTimeout(syncWithServer, 100)
  }, [])

  const setLanguage = (lang: Language) => {
    // Update UI immediately
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    // Save to server session in background (only if session exists)
    setServerLanguage(lang).catch((error) => {
      console.error("Failed to save language to server:", error)
      // This is fine - localStorage will be the source of truth
    })
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
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
