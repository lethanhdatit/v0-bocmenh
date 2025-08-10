/**
 * Feature Flags Configuration
 * Quản lý trạng thái các tính năng của website phong thủy
 */

export type FeaturePath = 
  // Tính năng chính
  | '/astrology'
  | '/destiny' 
  | '/dreams'
  | '/numerology'
  | '/tarot'
  | '/fengshui'
  | '/compatibility'
  | '/palmistry'
  | '/crystals'
  | '/meditation'
  | '/horoscope'
  | '/business-name'
  | '/name-analysis'
  | '/moving-date'
  | '/wedding-date'
  | '/store'
  | '/wishlist'
  | '/luckybox'
  // Gói nạp và lịch sử đã hoàn thiện
  | '/topups'
  | '/topups-checkout'
  | '/topups-history'
  | '/services-history'
  // Pages cơ bản (luôn active)
  | '/auth'
  | '/help' 
  | '/about'
  | '/contact'
  | '/privacy'
  | '/profile'
  | '/terms'
  | '/test'
  | '/';

export type FeatureStatus = 'active' | 'coming-soon' | 'maintenance';

export interface FeatureConfig {
  path: FeaturePath;
  status: FeatureStatus;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  estimatedLaunch?: string; // "Q1 2025", "Coming Soon", etc.
}

/**
 * Feature Flags Configuration
 * 
 * Status levels:
 * - 'active': Tính năng hoạt động bình thường
 * - 'coming-soon': Chưa phát triển xong, hiển thị coming soon
 * - 'maintenance': Đang bảo trì, tạm thời không khả dụng
 */
export const FEATURE_FLAGS: Record<FeaturePath, FeatureConfig> = {
  // ===== PAGES CƠ BẢN - ĐÃ HOÀN THIỆN =====
  '/': {
    path: '/',
    status: 'active',
    title: 'Trang Chủ'
  },
  
  '/destiny': {
    path: '/destiny',
    status: 'active', // Đã hoàn thiện
    title: 'Bói Vận Mệnh',
    titleKey: 'features.destiny.title'
  },

  '/auth': {
    path: '/auth',
    status: 'active',
    title: 'Xác Thực'
  },
  
  '/help': {
    path: '/help',
    status: 'active',
    title: 'Trợ Giúp'
  },
  
  '/about': {
    path: '/about',
    status: 'active',
    title: 'Về Chúng Tôi'
  },
  
  '/contact': {
    path: '/contact',
    status: 'active',
    title: 'Liên Hệ'
  },
  
  '/privacy': {
    path: '/privacy',
    status: 'active',
    title: 'Chính Sách Bảo Mật'
  },
  
  '/profile': {
    path: '/profile',
    status: 'active',
    title: 'Hồ Sơ Cá Nhân'
  },
  
  '/services-history': {
    path: '/services-history',
    status: 'active', 
    title: 'Lịch Sử Sử Dụng',
    titleKey: 'nav.servicesHistory'
  },
  
  '/terms': {
    path: '/terms',
    status: 'active',
    title: 'Điều Khoản Sử Dụng'
  },
  
  '/test': {
    path: '/test',
    status: 'active',
    title: 'Test'
  },

  '/topups': {
    path: '/topups',
    status: 'active',
    title: 'Gói Nạp',
    titleKey: 'nav.topups'
  },
  
  '/topups-checkout': {
    path: '/topups-checkout', 
    status: 'active',
    title: 'Thanh Toán',
    titleKey: 'checkout.title'
  },
  
  '/topups-history': {
    path: '/topups-history',
    status: 'active',
    title: 'Lịch Sử Nạp',
    titleKey: 'nav.topupsHistory'
  },

  // ===== TÍNH NĂNG ĐANG PHÁT TRIỂN =====
  
  // Chiêm tinh học
  '/astrology': {
    path: '/astrology',
    status: 'coming-soon',
    title: 'Biểu Đồ Sao Cá Nhân',
    titleKey: 'features.astrology.title',
    description: 'Tạo và phân tích biểu đồ sao cá nhân',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/horoscope': {
    path: '/horoscope',
    status: 'coming-soon',
    title: 'Bát Tự Hằng Ngày',
    titleKey: 'features.horoscope.title',
    estimatedLaunch: 'Q2 2025'
  },

  // Bói toán và giải mộng
  '/dreams': {
    path: '/dreams', 
    status: 'coming-soon',
    title: 'Giải Mộng',
    titleKey: 'features.dreams.title',
    estimatedLaunch: 'Q2 2025'
  },
  
  '/tarot': {
    path: '/tarot',
    status: 'coming-soon',
    title: 'Bói Bài Tarot',
    titleKey: 'features.tarot.title',
    estimatedLaunch: 'Q1 2025'
  },

  // Thần số học  
  '/numerology': {
    path: '/numerology',
    status: 'coming-soon',
    title: 'Thần Số Học',
    titleKey: 'features.numerology.title',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/name-analysis': {
    path: '/name-analysis',
    status: 'coming-soon',
    title: 'Phân Tích Tên',
    titleKey: 'features.nameAnalysis.title',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/business-name': {
    path: '/business-name',
    status: 'coming-soon', 
    title: 'Đặt Tên Doanh Nghiệp',
    titleKey: 'features.businessName.title',
    estimatedLaunch: 'Q2 2025'
  },

  // Phong thủy
  '/fengshui': {
    path: '/fengshui',
    status: 'coming-soon',
    title: 'Phong Thủy',
    titleKey: 'features.fengshui.title',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/moving-date': {
    path: '/moving-date',
    status: 'coming-soon',
    title: 'Chọn Ngày Chuyển Nhà',
    titleKey: 'features.movingDate.title',
    estimatedLaunch: 'Q2 2025'
  },
  
  '/wedding-date': {
    path: '/wedding-date',
    status: 'coming-soon',
    title: 'Chọn Ngày Cưới',
    titleKey: 'features.weddingDate.title', 
    estimatedLaunch: 'Q2 2025'
  },

  // Tương hợp & tâm linh
  '/compatibility': {
    path: '/compatibility',
    status: 'coming-soon',
    title: 'Xem Tướng Số',
    titleKey: 'features.compatibility.title',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/palmistry': {
    path: '/palmistry',
    status: 'coming-soon',
    title: 'Xem Tướng Bàn Tay', 
    titleKey: 'features.palmistry.title',
    estimatedLaunch: 'Q2 2025'
  },
  
  '/crystals': {
    path: '/crystals',
    status: 'coming-soon',
    title: 'Đá Phong Thủy',
    titleKey: 'features.crystals.title',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/meditation': {
    path: '/meditation',
    status: 'coming-soon',
    title: 'Thiền Định',
    titleKey: 'features.meditation.title',
    estimatedLaunch: 'Q2 2025'
  },

  // Thương mại
  '/store': {
    path: '/store',
    status: 'active',
    title: 'Cửa Hàng',
    titleKey: 'features.store.title',
    estimatedLaunch: 'Q1 2025'
  },
  
  '/wishlist': {
    path: '/wishlist',
    status: 'coming-soon',
    title: 'Danh Sách Yêu Thích',
    titleKey: 'features.wishlist.title',
    estimatedLaunch: 'Q1 2025'
  },

  '/luckybox': {
    path: '/luckybox',
    status: 'active',
    title: 'Túi Mù',
    titleKey: 'nav.luckybox',
    estimatedLaunch: 'Q1 2025'
  }
};

/**
 * Helper functions
 */
export const getFeatureConfig = (path: string): FeatureConfig | null => {
  return FEATURE_FLAGS[path as FeaturePath] || null;
};

export const isFeatureActive = (path: string): boolean => {
  const config = getFeatureConfig(path);
  return config?.status === 'active';
};

export const isFeatureComingSoon = (path: string): boolean => {
  const config = getFeatureConfig(path);
  return config?.status === 'coming-soon';
};

export const isFeatureMaintenance = (path: string): boolean => {
  const config = getFeatureConfig(path);
  return config?.status === 'maintenance';
};
