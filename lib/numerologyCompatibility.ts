import { calculateCompleteNumerology } from "./numerology"

export interface CompatibilityResult {
  overallScore: number
  overallRating: "Excellent" | "Very Good" | "Good" | "Fair" | "Challenging"
  lifePathCompatibility: {
    score: number
    interpretation: string
    advice: string
  }
  destinyCompatibility: {
    score: number
    interpretation: string
    advice: string
  }
  soulUrgeCompatibility: {
    score: number
    interpretation: string
    advice: string
  }
  personalityCompatibility: {
    score: number
    interpretation: string
    advice: string
  }
  birthdayCompatibility: {
    score: number
    interpretation: string
    advice: string
  }
  personalYearCompatibility: {
    score: number
    interpretation: string
    advice: string
  }
  strengths: string[]
  challenges: string[]
  relationshipAdvice: string[]
  bestAspects: string[]
  areasToWorkOn: string[]
  communicationStyle: string
  conflictResolution: string
  longTermPotential: string
  romanticCompatibility: number
  friendshipCompatibility: number
  businessCompatibility: number
}

// Compatibility matrix for different number combinations
const compatibilityMatrix: Record<string, number> = {
  // Life Path 1 compatibilities
  "1-1": 85,
  "1-2": 60,
  "1-3": 75,
  "1-4": 55,
  "1-5": 80,
  "1-6": 65,
  "1-7": 70,
  "1-8": 75,
  "1-9": 70,
  "1-11": 85,
  "1-22": 70,
  "1-33": 65,

  // Life Path 2 compatibilities
  "2-1": 60,
  "2-2": 90,
  "2-3": 65,
  "2-4": 85,
  "2-5": 50,
  "2-6": 95,
  "2-7": 60,
  "2-8": 80,
  "2-9": 75,
  "2-11": 95,
  "2-22": 85,
  "2-33": 90,

  // Life Path 3 compatibilities
  "3-1": 75,
  "3-2": 65,
  "3-3": 80,
  "3-4": 45,
  "3-5": 85,
  "3-6": 90,
  "3-7": 50,
  "3-8": 55,
  "3-9": 95,
  "3-11": 80,
  "3-22": 60,
  "3-33": 85,

  // Life Path 4 compatibilities
  "4-1": 55,
  "4-2": 85,
  "4-3": 45,
  "4-4": 75,
  "4-5": 40,
  "4-6": 80,
  "4-7": 70,
  "4-8": 90,
  "4-9": 50,
  "4-11": 60,
  "4-22": 95,
  "4-33": 70,

  // Life Path 5 compatibilities
  "5-1": 80,
  "5-2": 50,
  "5-3": 85,
  "5-4": 40,
  "5-5": 75,
  "5-6": 55,
  "5-7": 80,
  "5-8": 60,
  "5-9": 70,
  "5-11": 75,
  "5-22": 55,
  "5-33": 60,

  // Life Path 6 compatibilities
  "6-1": 65,
  "6-2": 95,
  "6-3": 90,
  "6-4": 80,
  "6-5": 55,
  "6-6": 85,
  "6-7": 60,
  "6-8": 70,
  "6-9": 95,
  "6-11": 90,
  "6-22": 80,
  "6-33": 100,

  // Life Path 7 compatibilities
  "7-1": 70,
  "7-2": 60,
  "7-3": 50,
  "7-4": 70,
  "7-5": 80,
  "7-6": 60,
  "7-7": 85,
  "7-8": 55,
  "7-9": 65,
  "7-11": 95,
  "7-22": 75,
  "7-33": 80,

  // Life Path 8 compatibilities
  "8-1": 75,
  "8-2": 80,
  "8-3": 55,
  "8-4": 90,
  "8-5": 60,
  "8-6": 70,
  "8-7": 55,
  "8-8": 80,
  "8-9": 60,
  "8-11": 70,
  "8-22": 95,
  "8-33": 75,

  // Life Path 9 compatibilities
  "9-1": 70,
  "9-2": 75,
  "9-3": 95,
  "9-4": 50,
  "9-5": 70,
  "9-6": 95,
  "9-7": 65,
  "9-8": 60,
  "9-9": 85,
  "9-11": 90,
  "9-22": 70,
  "9-33": 95,

  // Master Number 11 compatibilities
  "11-1": 85,
  "11-2": 95,
  "11-3": 80,
  "11-4": 60,
  "11-5": 75,
  "11-6": 90,
  "11-7": 95,
  "11-8": 70,
  "11-9": 90,
  "11-11": 100,
  "11-22": 85,
  "11-33": 95,

  // Master Number 22 compatibilities
  "22-1": 70,
  "22-2": 85,
  "22-3": 60,
  "22-4": 95,
  "22-5": 55,
  "22-6": 80,
  "22-7": 75,
  "22-8": 95,
  "22-9": 70,
  "22-11": 85,
  "22-22": 90,
  "22-33": 85,

  // Master Number 33 compatibilities
  "33-1": 65,
  "33-2": 90,
  "33-3": 85,
  "33-4": 70,
  "33-5": 60,
  "33-6": 100,
  "33-7": 80,
  "33-8": 75,
  "33-9": 95,
  "33-11": 95,
  "33-22": 85,
  "33-33": 95,
}

export function getCompatibilityScore(number1: number, number2: number): number {
  const key1 = `${number1}-${number2}`
  const key2 = `${number2}-${number1}`

  return compatibilityMatrix[key1] || compatibilityMatrix[key2] || 50
}

export function calculateNumerologyCompatibility(
  person1: { name: string; birthDate: string },
  person2: { name: string; birthDate: string },
): CompatibilityResult {
  // Calculate numerology for both people
  const numerology1 = calculateCompleteNumerology(person1.name, person1.birthDate)
  const numerology2 = calculateCompleteNumerology(person2.name, person2.birthDate)

  // Calculate compatibility scores for each aspect
  const lifePathScore = getCompatibilityScore(numerology1.lifePathNumber, numerology2.lifePathNumber)
  const destinyScore = getCompatibilityScore(numerology1.destinyNumber, numerology2.destinyNumber)
  const soulUrgeScore = getCompatibilityScore(numerology1.soulUrgeNumber, numerology2.soulUrgeNumber)
  const personalityScore = getCompatibilityScore(numerology1.personalityNumber, numerology2.personalityNumber)
  const birthdayScore = getCompatibilityScore(numerology1.birthdayNumber, numerology2.birthdayNumber)
  const personalYearScore = getCompatibilityScore(numerology1.personalYear, numerology2.personalYear)

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    lifePathScore * 0.3 +
      destinyScore * 0.25 +
      soulUrgeScore * 0.2 +
      personalityScore * 0.15 +
      birthdayScore * 0.05 +
      personalYearScore * 0.05,
  )

  // Determine overall rating
  const overallRating = getOverallRating(overallScore)

  // Generate detailed compatibility analysis
  const lifePathCompatibility = analyzeLifePathCompatibility(numerology1.lifePathNumber, numerology2.lifePathNumber)
  const destinyCompatibility = analyzeDestinyCompatibility(numerology1.destinyNumber, numerology2.destinyNumber)
  const soulUrgeCompatibility = analyzeSoulUrgeCompatibility(numerology1.soulUrgeNumber, numerology2.soulUrgeNumber)
  const personalityCompatibility = analyzePersonalityCompatibility(
    numerology1.personalityNumber,
    numerology2.personalityNumber,
  )
  const birthdayCompatibility = analyzeBirthdayCompatibility(numerology1.birthdayNumber, numerology2.birthdayNumber)
  const personalYearCompatibility = analyzePersonalYearCompatibility(numerology1.personalYear, numerology2.personalYear)

  // Generate relationship insights
  const relationshipInsights = generateRelationshipInsights(numerology1, numerology2, overallScore)

  return {
    overallScore,
    overallRating,
    lifePathCompatibility: {
      score: lifePathScore,
      ...lifePathCompatibility,
    },
    destinyCompatibility: {
      score: destinyScore,
      ...destinyCompatibility,
    },
    soulUrgeCompatibility: {
      score: soulUrgeScore,
      ...soulUrgeCompatibility,
    },
    personalityCompatibility: {
      score: personalityScore,
      ...personalityCompatibility,
    },
    birthdayCompatibility: {
      score: birthdayScore,
      ...birthdayCompatibility,
    },
    personalYearCompatibility: {
      score: personalYearScore,
      ...personalYearCompatibility,
    },
    ...relationshipInsights,
    romanticCompatibility: calculateRomanticCompatibility(numerology1, numerology2),
    friendshipCompatibility: calculateFriendshipCompatibility(numerology1, numerology2),
    businessCompatibility: calculateBusinessCompatibility(numerology1, numerology2),
  }
}

function getOverallRating(score: number): "Excellent" | "Very Good" | "Good" | "Fair" | "Challenging" {
  if (score >= 85) return "Excellent"
  if (score >= 75) return "Very Good"
  if (score >= 65) return "Good"
  if (score >= 55) return "Fair"
  return "Challenging"
}

function analyzeLifePathCompatibility(num1: number, num2: number) {
  const interpretations: Record<string, { interpretation: string; advice: string }> = {
    "1-1": {
      interpretation: "Hai người lãnh đạo mạnh mẽ có thể tạo ra một đội ngũ không thể cản phá hoặc xung đột quyền lực.",
      advice: "Học cách chia sẻ quyền lãnh đạo và tôn trọng ý kiến của nhau. Tránh cạnh tranh không cần thiết.",
    },
    "1-2": {
      interpretation: "Sự kết hợp giữa người lãnh đạo và người hỗ trợ có thể rất cân bằng nếu được quản lý tốt.",
      advice: "Số 1 cần kiên nhẫn hơn, số 2 cần tự tin hơn. Tôn trọng vai trò của nhau.",
    },
    "2-6": {
      interpretation: "Đây là một trong những kết hợp tương hợp nhất - cả hai đều quan tâm và nuôi dưỡng.",
      advice: "Tận dụng khả năng chăm sóc tự nhiên của cả hai để xây dựng mối quan hệ ấm áp và ổn định.",
    },
    "3-9": {
      interpretation: "Kết hợp sáng tạo và nhân đạo tạo ra một mối quan hệ đầy cảm hứng và ý nghĩa.",
      advice: "Sử dụng khả năng sáng tạo để phục vụ mục đích cao cả. Cùng nhau tạo ra tác động tích cực.",
    },
    // Add more specific combinations as needed
  }

  const key = `${num1}-${num2}`
  const reverseKey = `${num2}-${num1}`

  return (
    interpretations[key] ||
    interpretations[reverseKey] || {
      interpretation: `Sự kết hợp giữa số ${num1} và số ${num2} mang lại những thách thức và cơ hội độc đáo.`,
      advice: "Tập trung vào việc hiểu và đánh giá cao những điểm khác biệt của nhau.",
    }
  )
}

function analyzeDestinyCompatibility(num1: number, num2: number) {
  const score = getCompatibilityScore(num1, num2)

  if (score >= 80) {
    return {
      interpretation: "Mục tiêu và tài năng của hai người rất phù hợp và bổ sung cho nhau.",
      advice: "Hợp tác trong các dự án chung để tối đa hóa tiềm năng của cả hai.",
    }
  } else if (score >= 60) {
    return {
      interpretation: "Có sự tương thích tốt trong mục tiêu cuộc sống và cách tiếp cận công việc.",
      advice: "Tìm những điểm chung và xây dựng dựa trên đó.",
    }
  } else {
    return {
      interpretation: "Có thể có sự khác biệt trong mục tiêu và cách tiếp cận cuộc sống.",
      advice: "Học cách tôn trọng và hỗ trợ những mục tiêu khác nhau của nhau.",
    }
  }
}

function analyzeSoulUrgeCompatibility(num1: number, num2: number) {
  const score = getCompatibilityScore(num1, num2)

  if (score >= 80) {
    return {
      interpretation: "Động lực sâu thẳm và mong muốn của hai người rất hài hòa.",
      advice: "Chia sẻ những ước mơ và khát vọng để tăng cường kết nối tâm linh.",
    }
  } else if (score >= 60) {
    return {
      interpretation: "Có sự hiểu biết tốt về nhu cầu cảm xúc của nhau.",
      advice: "Dành thời gian để thực sự lắng nghe và hiểu những gì quan trọng với nhau.",
    }
  } else {
    return {
      interpretation: "Có thể có sự khác biệt trong động lực và mong muốn cốt lõi.",
      advice: "Kiên nhẫn và cởi mở để hiểu những gì thúc đẩy nhau.",
    }
  }
}

function analyzePersonalityCompatibility(num1: number, num2: number) {
  const score = getCompatibilityScore(num1, num2)

  if (score >= 80) {
    return {
      interpretation: "Cách thể hiện bản thân của hai người rất hài hòa và bổ sung.",
      advice: "Tận dụng sự tương thích tự nhiên này để xây dựng hình ảnh đôi mạnh mẽ.",
    }
  } else if (score >= 60) {
    return {
      interpretation: "Có sự cân bằng tốt trong cách giao tiếp và thể hiện.",
      advice: "Học hỏi từ phong cách giao tiếp khác nhau của nhau.",
    }
  } else {
    return {
      interpretation: "Có thể có sự khác biệt trong cách thể hiện và giao tiếp.",
      advice: "Tôn trọng phong cách giao tiếp khác nhau và tìm cách cầu nối.",
    }
  }
}

function analyzeBirthdayCompatibility(num1: number, num2: number) {
  const score = getCompatibilityScore(num1, num2)

  return {
    interpretation:
      score >= 70
        ? "Có sự tương thích tốt trong cách tiếp cận cuộc sống hàng ngày."
        : "Có thể có những khác biệt nhỏ trong thói quen và cách sống.",
    advice:
      score >= 70
        ? "Tận dụng sự đồng điệu này để xây dựng thói quen chung tích cực."
        : "Tôn trọng và thích ứng với thói quen khác nhau của nhau.",
  }
}

function analyzePersonalYearCompatibility(num1: number, num2: number) {
  const score = getCompatibilityScore(num1, num2)

  return {
    interpretation:
      score >= 70
        ? "Đang ở trong giai đoạn cuộc sống tương thích, dễ dàng hiểu và hỗ trợ nhau."
        : "Có thể đang trải qua những giai đoạn khác nhau trong cuộc sống.",
    advice:
      score >= 70
        ? "Tận dụng thời điểm thuận lợi này để phát triển mối quan hệ."
        : "Kiên nhẫn và hỗ trợ nhau qua những giai đoạn khác nhau.",
  }
}

function generateRelationshipInsights(numerology1: any, numerology2: any, overallScore: number) {
  const strengths: string[] = []
  const challenges: string[] = []
  const relationshipAdvice: string[] = []
  const bestAspects: string[] = []
  const areasToWorkOn: string[] = []

  // Analyze strengths based on compatible numbers
  if (getCompatibilityScore(numerology1.lifePathNumber, numerology2.lifePathNumber) >= 75) {
    strengths.push("Mục tiêu cuộc sống tương thích")
    bestAspects.push("Cùng hướng tới những mục tiêu tương tự trong cuộc sống")
  }

  if (getCompatibilityScore(numerology1.soulUrgeNumber, numerology2.soulUrgeNumber) >= 75) {
    strengths.push("Kết nối tâm linh sâu sắc")
    bestAspects.push("Hiểu và chia sẻ những mong muốn sâu thẳm của nhau")
  }

  // Analyze challenges
  if (getCompatibilityScore(numerology1.personalityNumber, numerology2.personalityNumber) < 60) {
    challenges.push("Khác biệt trong cách giao tiếp")
    areasToWorkOn.push("Cải thiện kỹ năng giao tiếp và hiểu biết lẫn nhau")
  }

  if (getCompatibilityScore(numerology1.destinyNumber, numerology2.destinyNumber) < 60) {
    challenges.push("Mục tiêu nghề nghiệp có thể xung đột")
    areasToWorkOn.push("Tìm cách cân bằng giữa mục tiêu cá nhân và chung")
  }

  // General relationship advice based on overall score
  if (overallScore >= 80) {
    relationshipAdvice.push("Đây là một mối quan hệ có tiềm năng rất cao. Hãy nuôi dưỡng và phát triển nó.")
    relationshipAdvice.push("Tận dụng sự tương thích tự nhiên để xây dựng nền tảng vững chắc.")
  } else if (overallScore >= 65) {
    relationshipAdvice.push("Mối quan hệ có nhiều điểm tích cực. Tập trung vào những điểm mạnh.")
    relationshipAdvice.push("Làm việc cùng nhau để vượt qua những thách thức nhỏ.")
  } else {
    relationshipAdvice.push("Mối quan hệ cần nhiều nỗ lực và hiểu biết từ cả hai phía.")
    relationshipAdvice.push("Kiên nhẫn và giao tiếp mở là chìa khóa thành công.")
  }

  // Communication style analysis
  const communicationStyle = analyzeCommunicationStyle(numerology1, numerology2)
  const conflictResolution = analyzeConflictResolution(numerology1, numerology2)
  const longTermPotential = analyzeLongTermPotential(numerology1, numerology2, overallScore)

  return {
    strengths,
    challenges,
    relationshipAdvice,
    bestAspects,
    areasToWorkOn,
    communicationStyle,
    conflictResolution,
    longTermPotential,
  }
}

function analyzeCommunicationStyle(numerology1: any, numerology2: any): string {
  const person1Style = getCommunicationStyle(numerology1.personalityNumber)
  const person2Style = getCommunicationStyle(numerology2.personalityNumber)

  return `${person1Style} kết hợp với ${person2Style}. Cả hai nên tôn trọng phong cách giao tiếp khác nhau và tìm điểm chung.`
}

function getCommunicationStyle(personalityNumber: number): string {
  const styles: Record<number, string> = {
    1: "Giao tiếp trực tiếp và quyết đoán",
    2: "Giao tiếp nhẹ nhàng và thấu hiểu",
    3: "Giao tiếp sáng tạo và biểu cảm",
    4: "Giao tiếp thực tế và có tổ chức",
    5: "Giao tiếp năng động và linh hoạt",
    6: "Giao tiếp ấm áp và quan tâm",
    7: "Giao tiếp sâu sắc và suy tư",
    8: "Giao tiếp mạnh mẽ và có mục tiêu",
    9: "Giao tiếp rộng lượng và truyền cảm hứng",
    11: "Giao tiếp trực giác và tâm linh",
    22: "Giao tiếp có tầm nhìn và thực tế",
    33: "Giao tiếp chữa lành và nuôi dưỡng",
  }

  return styles[personalityNumber] || "Giao tiếp độc đáo"
}

function analyzeConflictResolution(numerology1: any, numerology2: any): string {
  const lifePathSum = numerology1.lifePathNumber + numerology2.lifePathNumber

  if (lifePathSum <= 6) {
    return "Giải quyết xung đột thông qua giao tiếp bình tĩnh và thấu hiểu. Tránh đối đầu trực tiếp."
  } else if (lifePathSum <= 12) {
    return "Cân bằng giữa thảo luận mở và không gian cá nhân. Tìm giải pháp sáng tạo cho vấn đề."
  } else {
    return "Cần thời gian để suy nghĩ trước khi thảo luận. Tập trung vào mục tiêu chung thay vì ai đúng ai sai."
  }
}

function analyzeLongTermPotential(numerology1: any, numerology2: any, overallScore: number): string {
  if (overallScore >= 80) {
    return "Tiềm năng dài hạn rất cao. Mối quan hệ có thể phát triển mạnh mẽ và bền vững theo thời gian."
  } else if (overallScore >= 65) {
    return "Tiềm năng dài hạn tốt với sự nỗ lực và cam kết từ cả hai phía. Có thể xây dựng mối quan hệ ổn định."
  } else if (overallScore >= 50) {
    return "Tiềm năng dài hạn trung bình. Cần nhiều công việc và hiểu biết để duy trì mối quan hệ lâu dài."
  } else {
    return "Tiềm năng dài hạn thách thức. Cần sự cam kết mạnh mẽ và thay đổi từ cả hai phía."
  }
}

function calculateRomanticCompatibility(numerology1: any, numerology2: any): number {
  // Weighted calculation for romantic relationships
  const lifePathWeight = 0.25
  const soulUrgeWeight = 0.35 // Higher weight for emotional connection
  const destinyWeight = 0.2
  const personalityWeight = 0.2

  const lifePathScore = getCompatibilityScore(numerology1.lifePathNumber, numerology2.lifePathNumber)
  const soulUrgeScore = getCompatibilityScore(numerology1.soulUrgeNumber, numerology2.soulUrgeNumber)
  const destinyScore = getCompatibilityScore(numerology1.destinyNumber, numerology2.destinyNumber)
  const personalityScore = getCompatibilityScore(numerology1.personalityNumber, numerology2.personalityNumber)

  return Math.round(
    lifePathScore * lifePathWeight +
      soulUrgeScore * soulUrgeWeight +
      destinyScore * destinyWeight +
      personalityScore * personalityWeight,
  )
}

function calculateFriendshipCompatibility(numerology1: any, numerology2: any): number {
  // Weighted calculation for friendships
  const personalityWeight = 0.4 // Higher weight for social interaction
  const lifePathWeight = 0.25
  const destinyWeight = 0.2
  const soulUrgeWeight = 0.15

  const personalityScore = getCompatibilityScore(numerology1.personalityNumber, numerology2.personalityNumber)
  const lifePathScore = getCompatibilityScore(numerology1.lifePathNumber, numerology2.lifePathNumber)
  const destinyScore = getCompatibilityScore(numerology1.destinyNumber, numerology2.destinyNumber)
  const soulUrgeScore = getCompatibilityScore(numerology1.soulUrgeNumber, numerology2.soulUrgeNumber)

  return Math.round(
    personalityScore * personalityWeight +
      lifePathScore * lifePathWeight +
      destinyScore * destinyWeight +
      soulUrgeScore * soulUrgeWeight,
  )
}

function calculateBusinessCompatibility(numerology1: any, numerology2: any): number {
  // Weighted calculation for business partnerships
  const destinyWeight = 0.4 // Higher weight for career goals
  const lifePathWeight = 0.3 // Life purpose alignment
  const personalityWeight = 0.2 // Working style
  const soulUrgeWeight = 0.1 // Motivation alignment

  const destinyScore = getCompatibilityScore(numerology1.destinyNumber, numerology2.destinyNumber)
  const lifePathScore = getCompatibilityScore(numerology1.lifePathNumber, numerology2.lifePathNumber)
  const personalityScore = getCompatibilityScore(numerology1.personalityNumber, numerology2.personalityNumber)
  const soulUrgeScore = getCompatibilityScore(numerology1.soulUrgeNumber, numerology2.soulUrgeNumber)

  return Math.round(
    destinyScore * destinyWeight +
      lifePathScore * lifePathWeight +
      personalityScore * personalityWeight +
      soulUrgeScore * soulUrgeWeight,
  )
}
