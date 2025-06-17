// Horoscope calculation utilities
import { format } from "date-fns"

// Zodiac sign types and interfaces
export interface ZodiacSign {
  name: string
  vietnameseName: string
  symbol: string
  element: "Fire" | "Earth" | "Air" | "Water"
  vietnameseElement: "Hỏa" | "Thổ" | "Khí" | "Thủy"
  ruling: string
  startDate: string // MM-DD format
  endDate: string // MM-DD format
  traits: string[]
  strengths: string[]
  weaknesses: string[]
  compatibility: string[]
  luckyNumbers: number[]
  luckyColors: string[]
}

export interface HoroscopeResult {
  sign: ZodiacSign
  date: string
  type: "daily" | "weekly" | "monthly"
  love: {
    score: number
    text: string
    advice: string
  }
  career: {
    score: number
    text: string
    advice: string
  }
  health: {
    score: number
    text: string
    advice: string
  }
  finance: {
    score: number
    text: string
    advice: string
  }
  luck: {
    score: number
    text: string
    luckyNumbers: number[]
    luckyColors: string[]
    luckyDirections: string[]
  }
  overall: {
    score: number
    text: string
    advice: string
  }
}

// Zodiac signs database
export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    vietnameseName: "Bạch Dương",
    symbol: "♈",
    element: "Fire",
    vietnameseElement: "Hỏa",
    ruling: "Mars",
    startDate: "03-21",
    endDate: "04-19",
    traits: ["Dũng cảm", "Quyết đoán", "Nhiệt huyết", "Năng động"],
    strengths: ["Lãnh đạo", "Can đảm", "Tự tin", "Nhiệt tình"],
    weaknesses: ["Nóng nảy", "Thiếu kiên nhẫn", "Bốc đồng", "Ích kỷ"],
    compatibility: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    luckyNumbers: [1, 8, 17],
    luckyColors: ["Đỏ", "Cam"],
  },
  {
    name: "Taurus",
    vietnameseName: "Kim Ngưu",
    symbol: "♉",
    element: "Earth",
    vietnameseElement: "Thổ",
    ruling: "Venus",
    startDate: "04-20",
    endDate: "05-20",
    traits: ["Kiên nhẫn", "Đáng tin cậy", "Thực tế", "Thích an toàn"],
    strengths: ["Đáng tin cậy", "Kiên nhẫn", "Thực tế", "Trung thành"],
    weaknesses: ["Cứng đầu", "Sở hữu", "Không linh hoạt"],
    compatibility: ["Virgo", "Capricorn", "Cancer", "Pisces"],
    luckyNumbers: [2, 6, 9],
    luckyColors: ["Xanh lá", "Hồng"],
  },
  {
    name: "Gemini",
    vietnameseName: "Song Tử",
    symbol: "♊",
    element: "Air",
    vietnameseElement: "Khí",
    ruling: "Mercury",
    startDate: "05-21",
    endDate: "06-20",
    traits: ["Thông minh", "Linh hoạt", "Giao tiếp tốt", "Tò mò"],
    strengths: ["Thích nghi", "Học hỏi nhanh", "Giao tiếp", "Trí tuệ"],
    weaknesses: ["Thiếu kiên định", "Phân tâm", "Hời hợt", "Lo lắng"],
    compatibility: ["Libra", "Aquarius", "Aries", "Leo"],
    luckyNumbers: [3, 5, 14],
    luckyColors: ["Vàng", "Xanh dương nhạt"],
  },
  {
    name: "Cancer",
    vietnameseName: "Cự Giải",
    symbol: "♋",
    element: "Water",
    vietnameseElement: "Thủy",
    ruling: "Moon",
    startDate: "06-21",
    endDate: "07-22",
    traits: ["Nhạy cảm", "Quan tâm", "Trực giác", "Bảo vệ"],
    strengths: ["Tình cảm", "Trực giác", "Chăm sóc", "Bảo vệ"],
    weaknesses: ["Đa cảm", "Thất thường", "Khó quên", "Bi quan"],
    compatibility: ["Scorpio", "Pisces", "Taurus", "Virgo"],
    luckyNumbers: [2, 7, 11],
    luckyColors: ["Bạc", "Trắng"],
  },
  {
    name: "Leo",
    vietnameseName: "Sư Tử",
    symbol: "♌",
    element: "Fire",
    vietnameseElement: "Hỏa",
    ruling: "Sun",
    startDate: "07-23",
    endDate: "08-22",
    traits: ["Tự tin", "Sáng tạo", "Hào phóng", "Lãnh đạo"],
    strengths: ["Sáng tạo", "Nhiệt tình", "Hào phóng", "Vui vẻ"],
    weaknesses: ["Kiêu ngạo", "Độc đoán", "Cứng đầu", "Lười biếng"],
    compatibility: ["Aries", "Sagittarius", "Gemini", "Libra"],
    luckyNumbers: [1, 5, 9],
    luckyColors: ["Vàng", "Cam"],
  },
  {
    name: "Virgo",
    vietnameseName: "Xử Nữ",
    symbol: "♍",
    element: "Earth",
    vietnameseElement: "Thổ",
    ruling: "Mercury",
    startDate: "08-23",
    endDate: "09-22",
    traits: ["Phân tích", "Tỉ mỉ", "Thực tế", "Cầu toàn"],
    strengths: ["Phân tích", "Thực tế", "Đáng tin cậy", "Tỉ mỉ"],
    weaknesses: ["Chỉ trích", "Lo lắng", "Cầu toàn", "Bảo thủ"],
    compatibility: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
    luckyNumbers: [5, 14, 23],
    luckyColors: ["Nâu", "Xanh lá nhạt"],
  },
  {
    name: "Libra",
    vietnameseName: "Thiên Bình",
    symbol: "♎",
    element: "Air",
    vietnameseElement: "Khí",
    ruling: "Venus",
    startDate: "09-23",
    endDate: "10-22",
    traits: ["Cân bằng", "Hòa đồng", "Công bằng", "Hợp tác"],
    strengths: ["Ngoại giao", "Công bằng", "Hòa đồng", "Hợp tác"],
    weaknesses: ["Thiếu quyết đoán", "Tránh xung đột", "Phụ thuộc", "Hời hợt"],
    compatibility: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
    luckyNumbers: [4, 6, 13],
    luckyColors: ["Hồng", "Xanh dương"],
  },
  {
    name: "Scorpio",
    vietnameseName: "Bọ Cạp",
    symbol: "♏",
    element: "Water",
    vietnameseElement: "Thủy",
    ruling: "Pluto, Mars",
    startDate: "10-23",
    endDate: "11-21",
    traits: ["Quyết tâm", "Bí ẩn", "Mạnh mẽ", "Đam mê"],
    strengths: ["Quyết tâm", "Trung thành", "Đam mê", "Trực giác"],
    weaknesses: ["Ghen tuông", "Thù hận", "Bí mật", "Ám ảnh"],
    compatibility: ["Cancer", "Pisces", "Virgo", "Capricorn"],
    luckyNumbers: [8, 11, 18],
    luckyColors: ["Đỏ đậm", "Đen"],
  },
  {
    name: "Sagittarius",
    vietnameseName: "Nhân Mã",
    symbol: "♐",
    element: "Fire",
    vietnameseElement: "Hỏa",
    ruling: "Jupiter",
    startDate: "11-22",
    endDate: "12-21",
    traits: ["Lạc quan", "Tự do", "Phiêu lưu", "Thẳng thắn"],
    strengths: ["Lạc quan", "Tự do", "Trung thực", "Hài hước"],
    weaknesses: ["Thiếu kiên nhẫn", "Hứa hẹn quá", "Thẳng thắn", "Vô tâm"],
    compatibility: ["Aries", "Leo", "Libra", "Aquarius"],
    luckyNumbers: [3, 7, 9],
    luckyColors: ["Xanh dương", "Tím"],
  },
  {
    name: "Capricorn",
    vietnameseName: "Ma Kết",
    symbol: "♑",
    element: "Earth",
    vietnameseElement: "Thổ",
    ruling: "Saturn",
    startDate: "12-22",
    endDate: "01-19",
    traits: ["Kỷ luật", "Trách nhiệm", "Tham vọng", "Kiên nhẫn"],
    strengths: ["Trách nhiệm", "Kỷ luật", "Quản lý", "Tự chủ"],
    weaknesses: ["Bi quan", "Cứng nhắc", "Khó tính", "Mong đợi quá cao"],
    compatibility: ["Taurus", "Virgo", "Scorpio", "Pisces"],
    luckyNumbers: [4, 8, 13],
    luckyColors: ["Nâu", "Đen"],
  },
  {
    name: "Aquarius",
    vietnameseName: "Bảo Bình",
    symbol: "♒",
    element: "Air",
    vietnameseElement: "Khí",
    ruling: "Uranus, Saturn",
    startDate: "01-20",
    endDate: "02-18",
    traits: ["Độc lập", "Sáng tạo", "Nhân đạo", "Tiến bộ"],
    strengths: ["Độc đáo", "Sáng tạo", "Nhân đạo", "Độc lập"],
    weaknesses: ["Xa cách", "Không thực tế", "Cố chấp", "Nổi loạn"],
    compatibility: ["Gemini", "Libra", "Sagittarius", "Aries"],
    luckyNumbers: [4, 7, 11],
    luckyColors: ["Xanh dương", "Bạc"],
  },
  {
    name: "Pisces",
    vietnameseName: "Song Ngư",
    symbol: "♓",
    element: "Water",
    vietnameseElement: "Thủy",
    ruling: "Neptune, Jupiter",
    startDate: "02-19",
    endDate: "03-20",
    traits: ["Trực giác", "Mơ mộng", "Nghệ thuật", "Nhạy cảm"],
    strengths: ["Trực giác", "Đồng cảm", "Sáng tạo", "Nghệ thuật"],
    weaknesses: ["Mơ mộng", "Trốn tránh", "Hy sinh", "Dễ bị lừa"],
    compatibility: ["Cancer", "Scorpio", "Capricorn", "Taurus"],
    luckyNumbers: [3, 9, 12],
    luckyColors: ["Xanh lá biển", "Tím nhạt"],
  },
]

// Get zodiac sign from birth date
export function getZodiacSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()

  for (const sign of zodiacSigns) {
    const startMonth = Number.parseInt(sign.startDate.split("-")[0])
    const startDay = Number.parseInt(sign.startDate.split("-")[1])
    const endMonth = Number.parseInt(sign.endDate.split("-")[0])
    const endDay = Number.parseInt(sign.endDate.split("-")[1])

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (month > startMonth && month < endMonth)
    ) {
      return sign
    }
  }

  // Default to Aries if something goes wrong
  return zodiacSigns[0]
}

// Generate a seeded random number between min and max
function seededRandom(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000
  const result = x - Math.floor(x)
  return Math.floor(result * (max - min + 1)) + min
}

// Generate horoscope predictions
export function generateHoroscope(birthDate: Date, type: "daily" | "weekly" | "monthly"): HoroscopeResult {
  const sign = getZodiacSign(birthDate)
  const today = new Date()
  const dateString = format(today, "yyyy-MM-dd")

  // Create a seed based on date, sign, and type
  const signIndex = zodiacSigns.findIndex((s) => s.name === sign.name)
  const typeFactor = type === "daily" ? 1 : type === "weekly" ? 7 : 30
  const seed = Number.parseInt(dateString.replace(/-/g, "")) + signIndex * 100 + typeFactor

  // Generate scores (1-10)
  const loveScore = seededRandom(seed + 1, 1, 10)
  const careerScore = seededRandom(seed + 2, 1, 10)
  const healthScore = seededRandom(seed + 3, 1, 10)
  const financeScore = seededRandom(seed + 4, 1, 10)
  const luckScore = seededRandom(seed + 5, 1, 10)

  // Calculate overall score (weighted average)
  const overallScore =
    Math.round(
      (loveScore * 0.25 + careerScore * 0.25 + healthScore * 0.2 + financeScore * 0.2 + luckScore * 0.1) * 10,
    ) / 10

  // Generate lucky numbers
  const luckyNumbers: number[] = []
  for (let i = 0; i < 3; i++) {
    let num = seededRandom(seed + 100 + i, 1, 99)
    while (luckyNumbers.includes(num)) {
      num = seededRandom(seed + 100 + i + num, 1, 99)
    }
    luckyNumbers.push(num)
  }

  // Generate lucky directions
  const directions = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"]
  const luckyDirections: string[] = []
  for (let i = 0; i < 2; i++) {
    const dirIndex = seededRandom(seed + 200 + i, 0, directions.length - 1)
    if (!luckyDirections.includes(directions[dirIndex])) {
      luckyDirections.push(directions[dirIndex])
    }
  }

  // Prediction texts based on scores
  const getLovePrediction = (score: number): string => {
    if (score >= 8) return "Tình yêu đang nở rộ, bạn sẽ cảm thấy hạnh phúc và được yêu thương."
    if (score >= 6) return "Mối quan hệ của bạn ổn định, nhưng cần thêm sự quan tâm."
    if (score >= 4) return "Có thể có một số thử thách trong chuyện tình cảm, hãy kiên nhẫn."
    return "Đây không phải là thời điểm tốt cho tình yêu, hãy tập trung vào bản thân."
  }

  const getCareerPrediction = (score: number): string => {
    if (score >= 8) return "Sự nghiệp đang phát triển tốt, có thể có cơ hội mới đang chờ đợi."
    if (score >= 6) return "Công việc ổn định, nhưng bạn nên chuẩn bị cho những thay đổi."
    if (score >= 4) return "Có thể gặp một số khó khăn trong công việc, hãy cẩn thận."
    return "Đây là thời điểm khó khăn trong sự nghiệp, hãy kiên nhẫn và cố gắng."
  }

  const getHealthPrediction = (score: number): string => {
    if (score >= 8) return "Sức khỏe rất tốt, hãy duy trì lối sống lành mạnh."
    if (score >= 6) return "Sức khỏe ổn định, nhưng nên chú ý nghỉ ngơi đầy đủ."
    if (score >= 4) return "Cần chú ý đến sức khỏe, đặc biệt là về tinh thần."
    return "Sức khỏe không tốt, hãy đi khám nếu cảm thấy không khỏe."
  }

  const getFinancePrediction = (score: number): string => {
    if (score >= 8) return "Tài chính rất tốt, có thể có nguồn thu nhập mới."
    if (score >= 6) return "Tài chính ổn định, nhưng nên tiết kiệm cho tương lai."
    if (score >= 4) return "Cần cẩn thận với chi tiêu, tránh mua sắm không cần thiết."
    return "Tài chính không tốt, hãy tránh các khoản đầu tư rủi ro."
  }

  const getLuckPrediction = (score: number): string => {
    if (score >= 8) return "May mắn đang mỉm cười với bạn, hãy nắm bắt cơ hội."
    if (score >= 6) return "Vận may khá tốt, nhưng đừng quá phụ thuộc vào nó."
    if (score >= 4) return "May mắn trung bình, hãy cẩn thận trong các quyết định."
    return "Vận may không tốt, hãy tránh rủi ro và quyết định quan trọng."
  }

  const getOverallPrediction = (score: number): string => {
    if (score >= 8) return `Đây là thời điểm tuyệt vời cho ${sign.vietnameseName}. Hãy tự tin tiến về phía trước.`
    if (score >= 6)
      return `${sign.vietnameseName} đang có một giai đoạn khá tốt. Hãy tận dụng những điểm mạnh của mình.`
    if (score >= 4) return `${sign.vietnameseName} đang trải qua giai đoạn trung bình. Hãy kiên nhẫn và thận trọng.`
    return `Đây là thời điểm thử thách cho ${sign.vietnameseName}. Hãy giữ vững tinh thần và vượt qua khó khăn.`
  }

  // Generate advice based on scores
  const getLoveAdvice = (score: number): string => {
    if (score >= 8) return "Hãy chia sẻ tình cảm của bạn và tận hưởng khoảng thời gian bên người thân yêu."
    if (score >= 6) return "Dành thời gian chất lượng cho người bạn yêu thương và lắng nghe họ nhiều hơn."
    if (score >= 4) return "Giao tiếp là chìa khóa để giải quyết mọi vấn đề trong mối quan hệ."
    return "Hãy dành thời gian cho bản thân và suy ngẫm về những gì bạn thực sự muốn."
  }

  const getCareerAdvice = (score: number): string => {
    if (score >= 8) return "Đây là thời điểm tốt để đề xuất ý tưởng mới hoặc xin thăng chức."
    if (score >= 6) return "Hãy cải thiện kỹ năng và mở rộng mạng lưới quan hệ của bạn."
    if (score >= 4) return "Tập trung vào công việc hiện tại và cố gắng hoàn thành tốt nhất có thể."
    return "Hãy kiên nhẫn và tránh xung đột với đồng nghiệp hoặc cấp trên."
  }

  const getHealthAdvice = (score: number): string => {
    if (score >= 8) return "Duy trì lối sống lành mạnh với chế độ ăn uống cân bằng và tập thể dục đều đặn."
    if (score >= 6) return "Chú ý đến giấc ngủ và tìm cách giảm stress trong cuộc sống."
    if (score >= 4) return "Hãy nghỉ ngơi nhiều hơn và lắng nghe cơ thể của bạn."
    return "Đừng bỏ qua các dấu hiệu cảnh báo về sức khỏe, hãy đi khám nếu cần thiết."
  }

  const getFinanceAdvice = (score: number): string => {
    if (score >= 8) return "Đây là thời điểm tốt để đầu tư hoặc mở rộng nguồn thu nhập."
    if (score >= 6) return "Hãy lập kế hoạch tài chính và tiết kiệm cho tương lai."
    if (score >= 4) return "Cắt giảm chi tiêu không cần thiết và tránh các khoản vay nợ."
    return "Hãy thận trọng với mọi quyết định tài chính và tránh đầu tư rủi ro."
  }

  const getOverallAdvice = (score: number): string => {
    if (score >= 8) return "Hãy tận dụng thời điểm thuận lợi này để theo đuổi mục tiêu và ước mơ của bạn."
    if (score >= 6) return "Cân bằng giữa công việc và cuộc sống cá nhân sẽ giúp bạn duy trì năng lượng tích cực."
    if (score >= 4) return "Kiên nhẫn và tích cực là chìa khóa để vượt qua giai đoạn này."
    return "Hãy tập trung vào những điều bạn có thể kiểm soát và đừng quá lo lắng về tương lai."
  }

  return {
    sign,
    date: dateString,
    type,
    love: {
      score: loveScore,
      text: getLovePrediction(loveScore),
      advice: getLoveAdvice(loveScore),
    },
    career: {
      score: careerScore,
      text: getCareerPrediction(careerScore),
      advice: getCareerAdvice(careerScore),
    },
    health: {
      score: healthScore,
      text: getHealthPrediction(healthScore),
      advice: getHealthAdvice(healthScore),
    },
    finance: {
      score: financeScore,
      text: getFinancePrediction(financeScore),
      advice: getFinanceAdvice(financeScore),
    },
    luck: {
      score: luckScore,
      text: getLuckPrediction(luckScore),
      luckyNumbers,
      luckyColors: sign.luckyColors,
      luckyDirections,
    },
    overall: {
      score: overallScore,
      text: getOverallPrediction(overallScore),
      advice: getOverallAdvice(overallScore),
    },
  }
}
