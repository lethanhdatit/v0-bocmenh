import { MetadataRoute } from 'next'
import { getDefaultLanguageConfig } from '@/lib/i18n/language-config'
import { cookies } from 'next/headers'

// Manifest configurations for different languages
const manifestConfigs = {
  vi: {
    name: 'Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn',
    short_name: 'Bóc Mệnh',
    description: 'Nền tảng AI huyền học hàng đầu Việt Nam - Khám phá vận mệnh, giải mơ, thần số học, tarot, phong thủy online',
    shortcuts: [
      {
        name: 'Bóc Mệnh Cá Nhân',
        short_name: 'Bóc Mệnh',
        description: 'Khám phá vận mệnh qua ngày sinh',
        url: '/destiny',
        icons: [{ src: '/icons/destiny.png', sizes: '96x96' }]
      },
      {
        name: 'Giải Mơ AI',
        short_name: 'Giải Mơ', 
        description: 'Giải thích ý nghĩa giấc mơ',
        url: '/dreams',
        icons: [{ src: '/icons/dreams.png', sizes: '96x96' }]
      },
      {
        name: 'Thần Số Học',
        short_name: 'Thần Số',
        description: 'Phân tích số đường đời',
        url: '/numerology',
        icons: [{ src: '/icons/numerology.png', sizes: '96x96' }]
      },
      {
        name: 'Bói Tarot',
        short_name: 'Tarot',
        description: 'Rút bài Tarot online',
        url: '/tarot',
        icons: [{ src: '/icons/tarot.png', sizes: '96x96' }]
      }
    ]
  },
  en: {
    name: 'Boc Menh - Discover Your Destiny',
    short_name: 'Boc Menh',
    description: 'Leading AI mysticism platform in Vietnam - Explore destiny, dream interpretation, numerology, tarot, feng shui online',
    shortcuts: [
      {
        name: 'Personal Destiny Reading',
        short_name: 'Destiny',
        description: 'Discover your fate through birth date',
        url: '/en/destiny',
        icons: [{ src: '/icons/destiny.png', sizes: '96x96' }]
      },
      {
        name: 'AI Dream Interpretation',
        short_name: 'Dreams', 
        description: 'Understand the meaning of your dreams',
        url: '/en/dreams',
        icons: [{ src: '/icons/dreams.png', sizes: '96x96' }]
      },
      {
        name: 'Numerology',
        short_name: 'Numbers',
        description: 'Analyze your life path number',
        url: '/en/numerology',
        icons: [{ src: '/icons/numerology.png', sizes: '96x96' }]
      },
      {
        name: 'Tarot Reading',
        short_name: 'Tarot',
        description: 'Draw Tarot cards online',
        url: '/en/tarot',
        icons: [{ src: '/icons/tarot.png', sizes: '96x96' }]
      }
    ]
  }
}

export default function manifest(): MetadataRoute.Manifest {
  // Get language from cookie, fallback to default
  const cookieStore = cookies()
  const langCookie = cookieStore.get('NEXT_LOCALE')
  const defaultLang = getDefaultLanguageConfig()
  const currentLang = langCookie?.value && ['vi', 'en'].includes(langCookie.value) 
    ? langCookie.value as keyof typeof manifestConfigs
    : defaultLang.code as keyof typeof manifestConfigs

  const config = manifestConfigs[currentLang] || manifestConfigs[defaultLang.code as keyof typeof manifestConfigs]
  
  // Build start_url based on language
  const isDefaultLang = currentLang === defaultLang.code
  const startUrl = isDefaultLang ? '/' : `/${currentLang}/`
  
  return {
    name: config.name,
    short_name: config.short_name,
    description: config.description,
    start_url: startUrl,
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#EAB308',
    orientation: 'portrait-primary',
    categories: ['entertainment', 'lifestyle', 'education'],
    lang: currentLang,
    scope: '/',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/home-desktop.jpg',
        sizes: '1280x720',
        type: 'image/jpeg'
      },
      {
        src: '/screenshots/home-mobile.jpg', 
        sizes: '375x812',
        type: 'image/jpeg'
      }
    ],
    shortcuts: config.shortcuts
  }
}
