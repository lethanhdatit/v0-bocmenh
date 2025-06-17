export interface BirthChart {
  sun: string
  moon: string
  rising: string
  mercury: string
  venus: string
  mars: string
  jupiter: string
  saturn: string
  uranus: string
  neptune: string
  pluto: string
}

export interface AstrologyReading {
  birthChart: BirthChart
  personality: string
  strengths: string[]
  challenges: string[]
  careerGuidance: string
  loveLife: string
  luckyNumbers: number[]
  luckyColors: string[]
  compatibility: string[]
}

const zodiacSigns = [
  "Bạch Dương",
  "Kim Ngưu",
  "Song Tử",
  "Cự Giải",
  "Sư Tử",
  "Xử Nữ",
  "Thiên Bình",
  "Bọ Cạp",
  "Nhân Mã",
  "Ma Kết",
  "Bảo Bình",
  "Song Ngư",
]

const planets = ["Mặt Trời", "Mặt Trăng", "Sao Thủy", "Sao Kim", "Sao Hỏa", "Sao Mộc", "Sao Thổ"]

export function calculateBirthChart(birthDate: Date, birthTime: string, birthPlace: string): BirthChart {
  // Simplified calculation - in real app, use astronomical libraries
  const dayOfYear = Math.floor(
    (birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
  )
  const timeHour = Number.parseInt(birthTime.split(":")[0])

  const sunSign = zodiacSigns[Math.floor(dayOfYear / 30.4) % 12]
  const moonSign = zodiacSigns[(Math.floor(dayOfYear / 2.5) + timeHour) % 12]
  const risingSign = zodiacSigns[(timeHour * 2) % 12]

  return {
    sun: sunSign,
    moon: moonSign,
    rising: risingSign,
    mercury: zodiacSigns[(Math.floor(dayOfYear / 25) + 1) % 12],
    venus: zodiacSigns[(Math.floor(dayOfYear / 35) + 2) % 12],
    mars: zodiacSigns[(Math.floor(dayOfYear / 45) + 3) % 12],
    jupiter: zodiacSigns[(Math.floor(dayOfYear / 365) + 4) % 12],
    saturn: zodiacSigns[(Math.floor(dayOfYear / 400) + 5) % 12],
    uranus: zodiacSigns[(Math.floor(dayOfYear / 500) + 6) % 12],
    neptune: zodiacSigns[(Math.floor(dayOfYear / 600) + 7) % 12],
    pluto: zodiacSigns[(Math.floor(dayOfYear / 700) + 8) % 12],
  }
}

export function generateAstrologyReading(birthChart: BirthChart, name: string): AstrologyReading {
  const personalityTraits = {
    "Bạch Dương": "Năng động, quyết đoán, thích dẫn đầu",
    "Kim Ngưu": "Ổn định, kiên nhẫn, yêu thích sự thoải mái",
    "Song Tử": "Thông minh, linh hoạt, giao tiếp tốt",
    "Cự Giải": "Nhạy cảm, quan tâm gia đình, trực giác mạnh",
    "Sư Tử": "Tự tin, sáng tạo, thích được chú ý",
    "Xử Nữ": "Tỉ mỉ, thực tế, có tính phân tích cao",
    "Thiên Bình": "Hòa hợp, công bằng, thẩm mỹ tốt",
    "Bọ Cạp": "Mạnh mẽ, bí ẩn, có ý chí kiên định",
    "Nhân Mã": "Tự do, phiêu lưu, triết học",
    "Ma Kết": "Tham vọng, kỷ luật, có trách nhiệm",
    "Bảo Bình": "Độc lập, sáng tạo, nhân đạo",
    "Song Ngư": "Trực giác, từ bi, nghệ thuật",
  }

  const strengths = {
    "Bạch Dương": ["Lãnh đạo", "Dũng cảm", "Khởi xướng"],
    "Kim Ngưu": ["Kiên nhẫn", "Đáng tin cậy", "Thực tế"],
    "Song Tử": ["Thích ứng", "Giao tiếp", "Học hỏi"],
    "Cự Giải": ["Đồng cảm", "Bảo vệ", "Trực giác"],
    "Sư Tử": ["Sáng tạo", "Hào phóng", "Tự tin"],
    "Xử Nữ": ["Phân tích", "Tổ chức", "Hoàn hảo"],
    "Thiên Bình": ["Cân bằng", "Ngoại giao", "Thẩm mỹ"],
    "Bọ Cạp": ["Quyết tâm", "Trung thành", "Sâu sắc"],
    "Nhân Mã": ["Lạc quan", "Phiêu lưu", "Triết học"],
    "Ma Kết": ["Kỷ luật", "Tham vọng", "Trách nhiệm"],
    "Bảo Bình": ["Sáng tạo", "Độc lập", "Nhân đạo"],
    "Song Ngư": ["Trực giác", "Từ bi", "Nghệ thuật"],
  }

  const challenges = {
    "Bạch Dương": ["Nóng tính", "Thiếu kiên nhẫn", "Ích kỷ"],
    "Kim Ngưu": ["Cố chấp", "Lười biếng", "Vật chất"],
    "Song Tử": ["Không ổn định", "Nông cạn", "Lo lắng"],
    "Cự Giải": ["Quá nhạy cảm", "Khó khăn", "Cảm xúc"],
    "Sư Tử": ["Kiêu ngạo", "Thống trị", "Kịch tính"],
    "Xử Nữ": ["Hoàn hảo chủ nghĩa", "Phê phán", "Lo lắng"],
    "Thiên Bình": ["Do dự", "Tránh xung đột", "Phụ thuộc"],
    "Bọ Cạp": ["Ghen tuông", "Báo thù", "Bí mật"],
    "Nhân Mã": ["Thiếu cam kết", "Bất cẩn", "Thẳng thắn"],
    "Ma Kết": ["Bi quan", "Cứng nhắc", "Lạnh lùng"],
    "Bảo Bình": ["Xa cách", "Cố chấp", "Nổi loạn"],
    "Song Ngư": ["Mơ mộng", "Trốn tránh", "Hy sinh"],
  }

  return {
    birthChart,
    personality: personalityTraits[birthChart.sun] || "Tính cách độc đáo và phức tạp",
    strengths: strengths[birthChart.sun] || ["Sáng tạo", "Kiên định", "Thông minh"],
    challenges: challenges[birthChart.sun] || ["Cần phát triển", "Cần cân bằng", "Cần kiên nhẫn"],
    careerGuidance: `Với ${birthChart.sun} làm cung Mặt Trời, bạn phù hợp với các công việc sáng tạo và lãnh đạo.`,
    loveLife: `${birthChart.venus} trong cung Kim tinh mang đến tình yêu đầy đam mê và lãng mạn.`,
    luckyNumbers: [3, 7, 12, 21, 33],
    luckyColors: ["Vàng", "Đỏ", "Xanh dương"],
    compatibility: ["Sư Tử", "Nhân Mã", "Bảo Bình"],
  }
}
