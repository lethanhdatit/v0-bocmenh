// Feng Shui Calendar calculation utilities
export interface EventType {
  id: string
  name: string
  description: string
  icon: string
}

export interface CalendarDay {
  date: number
  lunarDate: string
  canChi: string
  truc: string
  star: string
  score: number
  rating: "excellent" | "good" | "fair" | "poor"
  reasons: string[]
  bestTimes: string[]
}

export interface CalendarAnalysis {
  month: number
  year: number
  eventType: string
  personalKua: number
  days: CalendarDay[]
  topDays: CalendarDay[]
  monthAnalysis: {
    canChi: string
    trucInfluence: string
    starInfluence: string
    generalAdvice: string[]
  }
}

// Event types
export const eventTypes: EventType[] = [
  { id: "wedding", name: "Kết hôn", description: "Ngày cưới hỏi, lễ ăn hỏi", icon: "💒" },
  { id: "business", name: "Khai trương", description: "Mở cửa hàng, công ty mới", icon: "🏪" },
  { id: "moving", name: "Chuyển nhà", description: "Dọn nhà, chuyển văn phòng", icon: "🏠" },
  { id: "travel", name: "Du lịch", description: "Khởi hành đi xa, công tác", icon: "✈️" },
  { id: "investment", name: "Đầu tư", description: "Mua bán, ký hợp đồng lớn", icon: "💰" },
  { id: "surgery", name: "Phẫu thuật", description: "Can thiệp y tế quan trọng", icon: "🏥" },
  { id: "study", name: "Học tập", description: "Bắt đầu khóa học, thi cử", icon: "📚" },
  { id: "meeting", name: "Họp mặt", description: "Tổ chức sự kiện, tiệc tùng", icon: "🎉" },
  { id: "haircut", name: "Cắt tóc", description: "Thay đổi diện mạo", icon: "✂️" },
  { id: "shopping", name: "Mua sắm", description: "Mua đồ quan trọng, xe cộ", icon: "🛍️" },
  { id: "prayer", name: "Cầu nguyện", description: "Lễ bái, cúng kiến", icon: "🙏" },
  { id: "other", name: "Khác", description: "Các sự kiện đặc biệt khác", icon: "⭐" },
]

// Heavenly Stems and Earthly Branches
const heavenlyStems = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
const earthlyBranches = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]

// 12 Truc (12 Officers)
const trucNames = ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"]

// 28 Stars
const stars = [
  "Giác",
  "Cang",
  "Đê",
  "Phòng",
  "Tâm",
  "Vĩ",
  "Cơ",
  "Đẩu",
  "Ngưu",
  "Nữ",
  "Hư",
  "Nguy",
  "Thất",
  "Bích",
  "Khuê",
  "Lâu",
  "Vị",
  "Mão",
  "Tất",
  "Chủy",
  "Sâm",
  "Tỉnh",
  "Quỷ",
  "Liễu",
  "Tinh",
  "Trương",
  "Dực",
  "Chẩn",
]

// Calculate Kua number
export function calculateKua(birthYear: number, gender: "male" | "female"): number {
  const lastTwoDigits = birthYear % 100
  const sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10)
  const finalSum = sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum

  if (gender === "male") {
    const kua = 11 - finalSum
    return kua === 5 ? 2 : kua > 9 ? kua - 9 : kua
  } else {
    const kua = finalSum + 4
    return kua === 5 ? 8 : kua > 9 ? kua - 9 : kua
  }
}

// Get Can Chi for a date
function getCanChi(year: number, month: number, day: number): string {
  // Simplified Can Chi calculation
  const baseDate = new Date(1900, 0, 31) // Reference date
  const currentDate = new Date(year, month - 1, day)
  const daysDiff = Math.floor((currentDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))

  const stemIndex = (daysDiff + 6) % 10 // +6 for adjustment
  const branchIndex = (daysDiff + 8) % 12 // +8 for adjustment

  return `${heavenlyStems[stemIndex]} ${earthlyBranches[branchIndex]}`
}

// Get Truc for a date
function getTruc(day: number): string {
  return trucNames[(day - 1) % 12]
}

// Get Star for a date
function getStar(day: number): string {
  return stars[(day - 1) % 28]
}

// Calculate day score based on multiple factors
function calculateDayScore(
  day: number,
  month: number,
  year: number,
  eventType: string,
  personalKua: number,
): { score: number; reasons: string[]; bestTimes: string[] } {
  const reasons: string[] = []
  let score = 50 // Base score

  // Can Chi influence (25%)
  const canChi = getCanChi(year, month, day)
  const canChiScore = Math.random() * 30 + 40 // 40-70
  score += (canChiScore - 50) * 0.25
  if (canChiScore > 60) reasons.push(`Can Chi ${canChi} hợp với sự kiện`)

  // Truc influence (25%)
  const truc = getTruc(day)
  const trucScore = getTrucScore(truc, eventType)
  score += (trucScore - 50) * 0.25
  if (trucScore > 60) reasons.push(`Trực ${truc} thuận lợi`)

  // Star influence (20%)
  const star = getStar(day)
  const starScore = getStarScore(star, eventType)
  score += (starScore - 50) * 0.2
  if (starScore > 60) reasons.push(`Sao ${star} chiếu mệnh`)

  // Personal Kua influence (30%)
  const kuaScore = getKuaCompatibility(personalKua, day)
  score += (kuaScore - 50) * 0.3
  if (kuaScore > 60) reasons.push(`Hợp với số Kua ${personalKua}`)

  // Best times of day
  const bestTimes = getBestTimes(day, eventType)

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons,
    bestTimes,
  }
}

// Get Truc score for event type
function getTrucScore(truc: string, eventType: string): number {
  const trucScores: { [key: string]: { [key: string]: number } } = {
    Kiến: { wedding: 85, business: 90, moving: 70, travel: 80 },
    Trừ: { wedding: 30, business: 40, moving: 85, travel: 60 },
    Mãn: { wedding: 95, business: 70, moving: 50, travel: 40 },
    Bình: { wedding: 80, business: 85, moving: 80, travel: 85 },
    Định: { wedding: 90, business: 95, moving: 60, travel: 70 },
    Chấp: { wedding: 40, business: 30, moving: 40, travel: 30 },
    Phá: { wedding: 20, business: 25, moving: 30, travel: 35 },
    Nguy: { wedding: 25, business: 20, moving: 25, travel: 20 },
    Thành: { wedding: 85, business: 90, moving: 85, travel: 80 },
    Thu: { wedding: 70, business: 80, moving: 75, travel: 85 },
    Khai: { wedding: 80, business: 85, moving: 90, travel: 90 },
    Bế: { wedding: 35, business: 30, moving: 35, travel: 40 },
  }

  return trucScores[truc]?.[eventType] || 50
}

// Get Star score for event type
function getStarScore(star: string, eventType: string): number {
  // Simplified star scoring
  const goodStars = ["Giác", "Cang", "Phòng", "Tâm", "Đẩu", "Ngưu", "Khuê", "Lâu", "Tỉnh", "Tinh"]
  const badStars = ["Đê", "Vĩ", "Cơ", "Hư", "Nguy", "Vị", "Chủy", "Quỷ", "Liễu"]

  if (goodStars.includes(star)) return Math.random() * 20 + 70 // 70-90
  if (badStars.includes(star)) return Math.random() * 30 + 20 // 20-50
  return Math.random() * 30 + 50 // 50-80
}

// Get Kua compatibility score
function getKuaCompatibility(kua: number, day: number): number {
  // Simplified Kua compatibility based on day
  const kuaScores = [85, 75, 65, 55, 45, 55, 65, 75, 85]
  return kuaScores[(day + kua - 2) % 9] || 50
}

// Get best times for the day
function getBestTimes(day: number, eventType: string): string[] {
  const times = ["5:00-7:00", "7:00-9:00", "9:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00"]
  const selectedTimes = []

  // Select 2-3 best times based on day and event
  const startIndex = (day + eventType.length) % times.length
  selectedTimes.push(times[startIndex])
  selectedTimes.push(times[(startIndex + 2) % times.length])

  if (Math.random() > 0.5) {
    selectedTimes.push(times[(startIndex + 4) % times.length])
  }

  return selectedTimes
}

// Get rating based on score
function getRating(score: number): "excellent" | "good" | "fair" | "poor" {
  if (score >= 85) return "excellent"
  if (score >= 70) return "good"
  if (score >= 50) return "fair"
  return "poor"
}

// Main analysis function
export function analyzeFengShuiCalendar(
  eventType: string,
  birthYear: number,
  gender: "male" | "female",
  month: number,
  year: number,
): CalendarAnalysis {
  const personalKua = calculateKua(birthYear, gender)
  const daysInMonth = new Date(year, month, 0).getDate()
  const days: CalendarDay[] = []

  // Analyze each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const canChi = getCanChi(year, month, day)
    const truc = getTruc(day)
    const star = getStar(day)
    const { score, reasons, bestTimes } = calculateDayScore(day, month, year, eventType, personalKua)

    days.push({
      date: day,
      lunarDate: `${day}/${month}`, // Simplified lunar date
      canChi,
      truc,
      star,
      score,
      rating: getRating(score),
      reasons,
      bestTimes,
    })
  }

  // Get top 5 days
  const topDays = [...days].sort((a, b) => b.score - a.score).slice(0, 5)

  // Month analysis
  const monthCanChi = getCanChi(year, month, 15) // Mid-month reference
  const monthAnalysis = {
    canChi: monthCanChi,
    trucInfluence: `Tháng ${month} chịu ảnh hưởng của các trực xoay vòng, cần chọn ngày có trực tốt`,
    starInfluence: `28 sao luân phiên chiếu mệnh, ảnh hưởng đến vận khí từng ngày`,
    generalAdvice: [
      `Tháng ${month}/${year} tổng thể thuận lợi cho sự kiện ${eventTypes.find((e) => e.id === eventType)?.name}`,
      `Nên chọn những ngày có điểm số cao và trực tốt`,
      `Tránh những ngày có sao xấu và trực không phù hợp`,
      `Kết hợp với số Kua cá nhân để có kết quả tốt nhất`,
    ],
  }

  return {
    month,
    year,
    eventType,
    personalKua,
    days,
    topDays,
    monthAnalysis,
  }
}
