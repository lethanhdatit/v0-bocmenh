// Flying Stars (Cửu Tinh Phi Phủ) calculation utilities

export interface FlyingStar {
  number: number
  name: string
  element: string
  nature: "auspicious" | "inauspicious" | "neutral"
  color: string
  meaning: string
  effects: string[]
  remedies: string[]
  enhancements: string[]
}

export interface PeriodInfo {
  period: number
  startYear: number
  endYear: number
  name: string
  element: string
}

export interface FlyingStarsChart {
  year: number
  period: number
  centerStar: number
  directions: {
    [key: string]: {
      star: number
      mountain: number
      water: number
    }
  }
}

export interface MonthlyStars {
  month: number
  year: number
  centerStar: number
  directions: {
    [key: string]: number
  }
}

// The 9 Flying Stars with their properties
export const flyingStarsData: { [key: number]: FlyingStar } = {
  1: {
    number: 1,
    name: "Tham Lang",
    element: "Thủy",
    nature: "auspicious",
    color: "Trắng",
    meaning: "Sao Tài Lộc, Học Vấn",
    effects: [
      "Tăng cường trí tuệ và học vấn",
      "Mang lại cơ hội thăng tiến",
      "Cải thiện tài chính",
      "Tốt cho nghiên cứu và sáng tạo",
    ],
    remedies: [],
    enhancements: [
      "Đặt cây xanh hoặc hoa tươi",
      "Sử dụng màu xanh lá cây",
      "Đặt bình nước hoặc hồ cá nhỏ",
      "Trang trí bằng kim loại màu trắng",
    ],
  },
  2: {
    number: 2,
    name: "Cự Môn",
    element: "Thổ",
    nature: "inauspicious",
    color: "Đen",
    meaning: "Sao Bệnh Tật",
    effects: [
      "Gây ra vấn đề sức khỏe",
      "Tạo căng thẳng trong gia đình",
      "Ảnh hưởng đến phụ nữ trong nhà",
      "Có thể gây tai nạn nhỏ",
    ],
    remedies: [
      "Treo chuông gió kim loại",
      "Đặt đồ vật bằng kim loại",
      "Sử dụng màu trắng, bạc, vàng",
      "Tránh màu đỏ và vàng đất",
    ],
    enhancements: [],
  },
  3: {
    number: 3,
    name: "Lộc Tồn",
    element: "Mộc",
    nature: "inauspicious",
    color: "Xanh lá",
    meaning: "Sao Tranh Chấp, Kiện Tụng",
    effects: [
      "Gây ra tranh cãi và xung đột",
      "Tạo ra các vấn đề pháp lý",
      "Ảnh hưởng đến mối quan hệ",
      "Có thể dẫn đến mất mát tài chính",
    ],
    remedies: [
      "Sử dụng màu đỏ để khắc chế",
      "Đặt đèn đỏ hoặc nến",
      "Tránh màu xanh lá cây",
      "Đặt tranh có màu đỏ hoặc cam",
    ],
    enhancements: [],
  },
  4: {
    number: 4,
    name: "Văn Khúc",
    element: "Mộc",
    nature: "auspicious",
    color: "Xanh lá",
    meaning: "Sao Văn Chương, Tình Yêu",
    effects: [
      "Tăng cường khả năng học tập",
      "Mang lại thành công trong thi cử",
      "Cải thiện mối quan hệ tình cảm",
      "Tốt cho sự nghiệp văn chương, nghệ thuật",
    ],
    remedies: [],
    enhancements: [
      "Đặt cây xanh hoặc hoa tươi",
      "Sử dụng màu xanh lá cây",
      "Đặt bàn học hoặc bàn làm việc",
      "Trang trí bằng đồ gỗ",
    ],
  },
  5: {
    number: 5,
    name: "Liêm Trinh",
    element: "Thổ",
    nature: "inauspicious",
    color: "Vàng",
    meaning: "Sao Tai Họa, Bệnh Tật",
    effects: [
      "Gây ra tai họa và bất hạnh",
      "Tạo ra các vấn đề sức khỏe nghiêm trọng",
      "Ảnh hưởng tiêu cực đến tài chính",
      "Có thể gây ra tai nạn",
    ],
    remedies: [
      "Treo chuông gió kim loại lớn",
      "Đặt nhiều đồ vật bằng kim loại",
      "Sử dụng màu trắng và bạc",
      "Tránh hoàn toàn màu đỏ và vàng",
    ],
    enhancements: [],
  },
  6: {
    number: 6,
    name: "Vũ Khúc",
    element: "Kim",
    nature: "auspicious",
    color: "Trắng",
    meaning: "Sao Quyền Lực, Quý Nhân",
    effects: [
      "Mang lại quyền lực và địa vị",
      "Thu hút sự giúp đỡ từ quý nhân",
      "Tăng cường uy tín và danh tiếng",
      "Tốt cho lãnh đạo và quản lý",
    ],
    remedies: [],
    enhancements: [
      "Đặt đồ vật bằng kim loại",
      "Sử dụng màu trắng, bạc, vàng",
      "Đặt tượng rồng hoặc phượng hoàng",
      "Trang trí bằng đá quý",
    ],
  },
  7: {
    number: 7,
    name: "Phá Quân",
    element: "Kim",
    nature: "inauspicious",
    color: "Đỏ",
    meaning: "Sao Trộm Cắp, Bạo Lực",
    effects: [
      "Tăng nguy cơ trộm cắp",
      "Gây ra bạo lực và xung đột",
      "Ảnh hưởng đến danh tiếng",
      "Có thể dẫn đến mất mát tài sản",
    ],
    remedies: [
      "Đặt bình nước hoặc hồ cá",
      "Sử dụng màu xanh dương và đen",
      "Đặt cây xanh",
      "Tránh màu đỏ và kim loại sáng",
    ],
    enhancements: [],
  },
  8: {
    number: 8,
    name: "Tả Phụ",
    element: "Thổ",
    nature: "auspicious",
    color: "Trắng",
    meaning: "Sao Thịnh Vượng, Tài Lộc",
    effects: [
      "Mang lại thịnh vượng và giàu có",
      "Tăng cường cơ hội kinh doanh",
      "Cải thiện tình hình tài chính",
      "Tốt cho đầu tư và tích lũy",
    ],
    remedies: [],
    enhancements: [
      "Đặt đèn sáng hoặc nến",
      "Sử dụng màu đỏ và vàng",
      "Đặt tượng Phật Di Lặc",
      "Trang trí bằng đá quý đỏ",
    ],
  },
  9: {
    number: 9,
    name: "Hữu Bật",
    element: "Hỏa",
    nature: "auspicious",
    color: "Tím",
    meaning: "Sao Hỷ Sự, Thành Công",
    effects: [
      "Mang lại niềm vui và hạnh phúc",
      "Tăng cường cơ hội thành công",
      "Cải thiện mối quan hệ xã hội",
      "Tốt cho kết hôn và sinh con",
    ],
    remedies: [],
    enhancements: [
      "Đặt cây xanh hoặc hoa tươi",
      "Sử dụng màu xanh lá cây",
      "Đặt đồ gỗ hoặc tre",
      "Trang trí bằng màu tím và hồng",
    ],
  },
}

// 20-year periods (元運)
export const periods: PeriodInfo[] = [
  { period: 7, startYear: 1984, endYear: 2003, name: "Thất Vận", element: "Kim" },
  { period: 8, startYear: 2004, endYear: 2023, name: "Bát Vận", element: "Thổ" },
  { period: 9, startYear: 2024, endYear: 2043, name: "Cửu Vận", element: "Hỏa" },
  { period: 1, startYear: 2044, endYear: 2063, name: "Nhất Vận", element: "Thủy" },
]

// Calculate current period based on year
export function getCurrentPeriod(year: number): PeriodInfo {
  for (const period of periods) {
    if (year >= period.startYear && year <= period.endYear) {
      return period
    }
  }
  // Default to period 9 if year is beyond our data
  return periods[2]
}

// Calculate annual Flying Stars chart
export function calculateAnnualFlyingStars(year: number): FlyingStarsChart {
  const period = getCurrentPeriod(year)

  // Calculate center star for the year
  // Formula: (Period number + (Year - Period start year)) mod 9
  // If result is 0, use 9
  const yearOffset = year - period.startYear
  let centerStar = (period.period + yearOffset) % 9
  if (centerStar === 0) centerStar = 9

  // Calculate stars for each direction based on center star
  const directions = {
    center: { star: centerStar, mountain: centerStar, water: centerStar },
    north: { star: (centerStar + 0) % 9 || 9, mountain: (centerStar + 0) % 9 || 9, water: (centerStar + 0) % 9 || 9 },
    northeast: {
      star: (centerStar + 1) % 9 || 9,
      mountain: (centerStar + 1) % 9 || 9,
      water: (centerStar + 1) % 9 || 9,
    },
    east: { star: (centerStar + 2) % 9 || 9, mountain: (centerStar + 2) % 9 || 9, water: (centerStar + 2) % 9 || 9 },
    southeast: {
      star: (centerStar + 3) % 9 || 9,
      mountain: (centerStar + 3) % 9 || 9,
      water: (centerStar + 3) % 9 || 9,
    },
    south: { star: (centerStar + 4) % 9 || 9, mountain: (centerStar + 4) % 9 || 9, water: (centerStar + 4) % 9 || 9 },
    southwest: {
      star: (centerStar + 5) % 9 || 9,
      mountain: (centerStar + 5) % 9 || 9,
      water: (centerStar + 5) % 9 || 9,
    },
    west: { star: (centerStar + 6) % 9 || 9, mountain: (centerStar + 6) % 9 || 9, water: (centerStar + 6) % 9 || 9 },
    northwest: {
      star: (centerStar + 7) % 9 || 9,
      mountain: (centerStar + 7) % 9 || 9,
      water: (centerStar + 7) % 9 || 9,
    },
  }

  return {
    year,
    period: period.period,
    centerStar,
    directions,
  }
}

// Calculate monthly Flying Stars
export function calculateMonthlyFlyingStars(month: number, year: number): MonthlyStars {
  const annualChart = calculateAnnualFlyingStars(year)

  // Monthly center star calculation
  // Formula based on annual center star and month
  let monthlyCenterStar = (annualChart.centerStar + month - 1) % 9
  if (monthlyCenterStar === 0) monthlyCenterStar = 9

  const directions = {
    center: monthlyCenterStar,
    north: (monthlyCenterStar + 0) % 9 || 9,
    northeast: (monthlyCenterStar + 1) % 9 || 9,
    east: (monthlyCenterStar + 2) % 9 || 9,
    southeast: (monthlyCenterStar + 3) % 9 || 9,
    south: (monthlyCenterStar + 4) % 9 || 9,
    southwest: (monthlyCenterStar + 5) % 9 || 9,
    west: (monthlyCenterStar + 6) % 9 || 9,
    northwest: (monthlyCenterStar + 7) % 9 || 9,
  }

  return {
    month,
    year,
    centerStar: monthlyCenterStar,
    directions,
  }
}

// Get star color for UI
export function getStarColor(starNumber: number): string {
  const star = flyingStarsData[starNumber]
  if (!star) return "gray"

  switch (star.nature) {
    case "auspicious":
      return "green"
    case "inauspicious":
      return "red"
    default:
      return "yellow"
  }
}

// Get direction name in Vietnamese
export function getDirectionName(direction: string): string {
  const directionNames: { [key: string]: string } = {
    center: "Trung Tâm",
    north: "Bắc",
    northeast: "Đông Bắc",
    east: "Đông",
    southeast: "Đông Nam",
    south: "Nam",
    southwest: "Tây Nam",
    west: "Tây",
    northwest: "Tây Bắc",
  }
  return directionNames[direction] || direction
}

// Get month name in Vietnamese
export function getMonthName(month: number): string {
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]
  return monthNames[month - 1] || `Tháng ${month}`
}

// Calculate best and worst directions for a given year
export function getYearlyDirectionAnalysis(year: number) {
  const chart = calculateAnnualFlyingStars(year)
  const analysis = {
    best: [] as Array<{ direction: string; star: number; reason: string }>,
    worst: [] as Array<{ direction: string; star: number; reason: string }>,
    neutral: [] as Array<{ direction: string; star: number; reason: string }>,
  }

  Object.entries(chart.directions).forEach(([direction, data]) => {
    const star = flyingStarsData[data.star]
    if (!star) return

    const item = {
      direction: getDirectionName(direction),
      star: data.star,
      reason: star.meaning,
    }

    if (star.nature === "auspicious") {
      analysis.best.push(item)
    } else if (star.nature === "inauspicious") {
      analysis.worst.push(item)
    } else {
      analysis.neutral.push(item)
    }
  })

  return analysis
}
