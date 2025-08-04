import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn',
    short_name: 'Bóc Mệnh',
    description: 'Nền tảng AI huyền học hàng đầu Việt Nam - Khám phá vận mệnh, giải mơ, thần số học, tarot, phong thủy online',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#EAB308',
    orientation: 'portrait-primary',
    categories: ['entertainment', 'lifestyle', 'education'],
    lang: 'vi',
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
  }
}
