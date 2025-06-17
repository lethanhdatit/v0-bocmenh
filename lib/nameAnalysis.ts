// Name numerology analysis utilities

export interface NameAnalysisResult {
  fullName: string
  destinyNumber: number
  soulUrgeNumber: number
  personalityNumber: number
  expressionNumber: number
  heartDesireNumber: number
  hiddenPassionNumbers: number[]
  karmicLessons: number[]
  cornerstone: string
  capstone: string
  firstVowel: string
  nameVibration: string
  luckyColors: string[]
  luckyDays: string[]
  careerSuggestions: string[]
  relationshipCompatibility: string[]
  personalityTraits: string[]
  strengths: string[]
  challenges: string[]
  lifeAdvice: string
}

// Letter to number mapping for Pythagorean system
const letterValues: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
}

// Vowels and consonants
const vowels = ["A", "E", "I", "O", "U", "Y"]
const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]

export function reduceToSingleDigit(num: number): number {
  // Master numbers (11, 22, 33) are not reduced
  if (num === 11 || num === 22 || num === 33) {
    return num
  }

  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
  }

  return num
}

export function calculateDestinyNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    sum += letterValues[letter] || 0
  }

  return reduceToSingleDigit(sum)
}

export function calculateSoulUrgeNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    if (vowels.includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

export function calculatePersonalityNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    if (consonants.includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

export function calculateExpressionNumber(fullName: string): number {
  // Expression number is the same as destiny number
  return calculateDestinyNumber(fullName)
}

export function calculateHeartDesireNumber(fullName: string): number {
  // Heart's desire is the same as soul urge number
  return calculateSoulUrgeNumber(fullName)
}

export function findHiddenPassionNumbers(fullName: string): number[] {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  const letterCount: Record<number, number> = {}

  // Count occurrences of each number
  for (const letter of cleanName) {
    const value = letterValues[letter]
    if (value) {
      letterCount[value] = (letterCount[value] || 0) + 1
    }
  }

  // Find the most frequent numbers
  const maxCount = Math.max(...Object.values(letterCount))
  return Object.keys(letterCount)
    .filter((key) => letterCount[Number.parseInt(key)] === maxCount)
    .map((key) => Number.parseInt(key))
}

export function findKarmicLessons(fullName: string): number[] {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  const presentNumbers = new Set<number>()

  for (const letter of cleanName) {
    const value = letterValues[letter]
    if (value) {
      presentNumbers.add(value)
    }
  }

  const karmicLessons: number[] = []
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      karmicLessons.push(i)
    }
  }

  return karmicLessons
}

export function getCornerstone(fullName: string): string {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  return cleanName.charAt(0) || ""
}

export function getCapstone(fullName: string): string {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  return cleanName.charAt(cleanName.length - 1) || ""
}

export function getFirstVowel(fullName: string): string {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "")
  for (const letter of cleanName) {
    if (vowels.includes(letter)) {
      return letter
    }
  }
  return ""
}

export function getNameVibration(destinyNumber: number): string {
  const vibrations: Record<number, string> = {
    1: "Năng lượng lãnh đạo và độc lập",
    2: "Năng lượng hợp tác và hòa hợp",
    3: "Năng lượng sáng tạo và giao tiếp",
    4: "Năng lượng ổn định và thực tế",
    5: "Năng lượng tự do và phiêu lưu",
    6: "Năng lượng chăm sóc và trách nhiệm",
    7: "Năng lượng tâm linh và trí tuệ",
    8: "Năng lượng thành công và quyền lực",
    9: "Năng lượng nhân đạo và phục vụ",
    11: "Năng lượng trực giác và truyền cảm hứng",
    22: "Năng lượng xây dựng và thực hiện lớn",
    33: "Năng lượng thầy giáo và chữa lành",
  }

  return vibrations[destinyNumber] || "Năng lượng đặc biệt"
}

export function getLuckyColors(destinyNumber: number): string[] {
  const colorMap: Record<number, string[]> = {
    1: ["Đỏ", "Cam", "Vàng"],
    2: ["Xanh lam", "Bạc", "Trắng"],
    3: ["Vàng", "Cam", "Hồng"],
    4: ["Xanh lá", "Nâu", "Xám"],
    5: ["Bạc", "Xám", "Xanh dương"],
    6: ["Xanh lá", "Hồng", "Xanh dương"],
    7: ["Tím", "Xanh lam", "Trắng"],
    8: ["Đen", "Nâu", "Xám đậm"],
    9: ["Đỏ", "Hồng", "Cam"],
    11: ["Bạc", "Trắng", "Xanh lam nhạt"],
    22: ["Đỏ đậm", "Nâu", "Vàng"],
    33: ["Vàng", "Xanh lá", "Tím"],
  }

  return colorMap[destinyNumber] || ["Trắng", "Bạc"]
}

export function getLuckyDays(destinyNumber: number): string[] {
  const dayMap: Record<number, string[]> = {
    1: ["Chủ nhật", "Thứ hai"],
    2: ["Thứ hai", "Thứ sáu"],
    3: ["Thứ ba", "Thứ năm"],
    4: ["Thứ tư", "Thứ bảy"],
    5: ["Thứ năm", "Chủ nhật"],
    6: ["Thứ sáu", "Thứ ba"],
    7: ["Thứ bảy", "Thứ tư"],
    8: ["Thứ bảy", "Thứ hai"],
    9: ["Thứ ba", "Thứ năm"],
    11: ["Thứ hai", "Thứ sáu"],
    22: ["Thứ bảy", "Thứ hai"],
    33: ["Thứ sáu", "Thứ ba"],
  }

  return dayMap[destinyNumber] || ["Chủ nhật"]
}

export function getCareerSuggestions(destinyNumber: number, personalityNumber: number): string[] {
  const careerMap: Record<number, string[]> = {
    1: ["Doanh nhân", "Giám đốc", "Nhà lãnh đạo", "Chính trị gia", "Nhà phát minh"],
    2: ["Tư vấn", "Giáo viên", "Y tá", "Nhà ngoại giao", "Trợ lý"],
    3: ["Nghệ sĩ", "Nhà văn", "Diễn viên", "Nhà thiết kế", "MC"],
    4: ["Kế toán", "Kỹ sư", "Quản lý", "Xây dựng", "Ngân hàng"],
    5: ["Du lịch", "Báo chí", "Bán hàng", "Giải trí", "Công nghệ"],
    6: ["Y tế", "Giáo dục", "Tư vấn", "Dịch vụ xã hội", "Nghệ thuật"],
    7: ["Nghiên cứu", "Tâm linh", "Khoa học", "Triết học", "Tâm lý học"],
    8: ["Kinh doanh", "Tài chính", "Bất động sản", "Luật", "Quản lý"],
    9: ["Từ thiện", "Nghệ thuật", "Giáo dục", "Y tế", "Tôn giáo"],
    11: ["Tâm linh", "Nghệ thuật", "Tư vấn", "Chữa lành", "Giảng dạy"],
    22: ["Kiến trúc", "Kỹ thuật", "Chính trị", "Kinh doanh lớn", "Tổ chức quốc tế"],
    33: ["Giáo dục", "Chữa lành", "Tâm linh", "Từ thiện", "Tư vấn"],
  }

  return careerMap[destinyNumber] || ["Đa dạng nghề nghiệp"]
}

export function getRelationshipCompatibility(destinyNumber: number): string[] {
  const compatibilityMap: Record<number, string[]> = {
    1: ["Số 1, 5, 7 - Rất tương hợp", "Số 3, 9 - Tương hợp tốt", "Số 2, 4, 6, 8 - Cần nỗ lực"],
    2: ["Số 2, 4, 8 - Rất tương hợp", "Số 1, 6, 9 - Tương hợp tốt", "Số 3, 5, 7 - Cần nỗ lực"],
    3: ["Số 3, 6, 9 - Rất tương hợp", "Số 1, 2, 5 - Tương hợp tốt", "Số 4, 7, 8 - Cần nỗ lực"],
    4: ["Số 2, 4, 8 - Rất tương hợp", "Số 6, 7 - Tương hợp tốt", "Số 1, 3, 5, 9 - Cần nỗ lực"],
    5: ["Số 1, 5, 7 - Rất tương hợp", "Số 3, 9 - Tương hợp tốt", "Số 2, 4, 6, 8 - Cần nỗ lực"],
    6: ["Số 2, 3, 6, 9 - Rất tương hợp", "Số 4, 8 - Tương hợp tốt", "Số 1, 5, 7 - Cần nỗ lực"],
    7: ["Số 1, 5, 7 - Rất tương hợp", "Số 4 - Tương hợp tốt", "Số 2, 3, 6, 8, 9 - Cần nỗ lực"],
    8: ["Số 2, 4, 8 - Rất tương hợp", "Số 6 - Tương hợp tốt", "Số 1, 3, 5, 7, 9 - Cần nỗ lực"],
    9: ["Số 3, 6, 9 - Rất tương hợp", "Số 1, 2, 5 - Tương hợp tốt", "Số 4, 7, 8 - Cần nỗ lực"],
  }

  return compatibilityMap[destinyNumber] || ["Tương hợp đặc biệt"]
}

export function getPersonalityTraits(destinyNumber: number, personalityNumber: number): string[] {
  const traits: Record<number, string[]> = {
    1: ["Độc lập", "Tự tin", "Quyết đoán", "Sáng tạo", "Tham vọng"],
    2: ["Nhạy cảm", "Hợp tác", "Kiên nhẫn", "Hòa bình", "Trực giác"],
    3: ["Sáng tạo", "Giao tiếp tốt", "Lạc quan", "Nghệ thuật", "Hài hước"],
    4: ["Thực tế", "Có tổ chức", "Chăm chỉ", "Đáng tin cậy", "Kiên nhẫn"],
    5: ["Tự do", "Phiêu lưu", "Linh hoạt", "Tò mò", "Năng động"],
    6: ["Có trách nhiệm", "Quan tâm", "Gia đình", "Hòa hợp", "Chữa lành"],
    7: ["Tâm linh", "Phân tích", "Trực giác", "Độc lập", "Sâu sắc"],
    8: ["Tham vọng", "Thực tế", "Tổ chức", "Quyền lực", "Thành công"],
    9: ["Nhân đạo", "Rộng lượng", "Sáng tạo", "Trực giác", "Phục vụ"],
  }

  return traits[destinyNumber] || ["Đặc biệt", "Độc đáo"]
}

export function getStrengths(destinyNumber: number): string[] {
  const strengths: Record<number, string[]> = {
    1: ["Khả năng lãnh đạo tự nhiên", "Tinh thần tiên phong", "Sáng tạo và đổi mới", "Quyết tâm cao"],
    2: ["Khả năng hợp tác tuyệt vời", "Trực giác mạnh", "Kiên nhẫn", "Khéo léo trong giao tiếp"],
    3: ["Khả năng giao tiếp xuất sắc", "Sáng tạo nghệ thuật", "Lạc quan tích cực", "Truyền cảm hứng"],
    4: ["Làm việc chăm chỉ", "Có tổ chức tốt", "Đáng tin cậy", "Kiên trì"],
    5: ["Thích ứng nhanh", "Năng động", "Tò mò học hỏi", "Giao tiếp tốt"],
    6: ["Quan tâm đến người khác", "Có trách nhiệm cao", "Tạo hòa hợp", "Khả năng chữa lành"],
    7: ["Trực giác mạnh", "Khả năng phân tích", "Tìm kiếm chân lý", "Độc lập"],
    8: ["Khả năng kinh doanh", "Tổ chức tốt", "Quyết đoán", "Thành công vật chất"],
    9: ["Lòng nhân ái", "Tầm nhìn rộng", "Sáng tạo", "Truyền cảm hứng"],
  }

  return strengths[destinyNumber] || ["Năng lực đặc biệt"]
}

export function getChallenges(destinyNumber: number): string[] {
  const challenges: Record<number, string[]> = {
    1: ["Có thể quá độc đoán", "Thiếu kiên nhẫn", "Khó hợp tác", "Có thể ích kỷ"],
    2: ["Quá nhạy cảm", "Thiếu tự tin", "Dễ bị ảnh hưởng", "Tránh xung đột"],
    3: ["Dễ phân tâm", "Thiếu kỷ luật", "Quá cảm tính", "Khó tập trung"],
    4: ["Quá cứng nhắc", "Thiếu linh hoạt", "Chậm thích ứng", "Quá thận trọng"],
    5: ["Thiếu kiên nhẫn", "Dễ chán nản", "Khó cam kết", "Bốc đồng"],
    6: ["Quá lo lắng", "Hy sinh quá mức", "Kiểm soát", "Hoàn hảo chủ nghĩa"],
    7: ["Quá hướng nội", "Khó gần", "Hoài nghi", "Cô lập"],
    8: ["Quá tập trung vào tiền bạc", "Độc đoán", "Căng thẳng", "Bỏ qua cảm xúc"],
    9: ["Quá lý tưởng", "Cảm tính", "Thiếu thực tế", "Dễ thất vọng"],
  }

  return challenges[destinyNumber] || ["Thách thức đặc biệt"]
}

export function getLifeAdvice(destinyNumber: number, karmicLessons: number[]): string {
  const advice: Record<number, string> = {
    1: "Phát triển khả năng lãnh đạo nhưng học cách lắng nghe và hợp tác với người khác. Kiên nhẫn sẽ giúp bạn đạt được mục tiêu lớn hơn.",
    2: "Tin tưởng vào trực giác và học cách đứng lên vì bản thân. Đừng để người khác lợi dụng lòng tốt của bạn.",
    3: "Tập trung vào một mục tiêu và kiên trì theo đuổi. Sử dụng khả năng giao tiếp để xây dựng mối quan hệ tốt.",
    4: "Học cách linh hoạt và mở lòng với những ý tưởng mới. Đừng quá khắt khe với bản thân và người khác.",
    5: "Học cách cam kết và kiên trì. Sử dụng năng lượng của bạn để tạo ra những thay đổi tích cực.",
    6: "Học cách chăm sóc bản thân trước khi chăm sóc người khác. Đừng cố gắng kiểm soát mọi thứ.",
    7: "Chia sẻ kiến thức và trực giác với người khác. Đừng cô lập bản thân quá mức.",
    8: "Sử dụng thành công để giúp đỡ người khác. Học cách thư giãn và tận hưởng cuộc sống.",
    9: "Tập trung vào những mục tiêu thực tế. Sử dụng lòng nhân ái để tạo ra thay đổi tích cực.",
  }

  let baseAdvice = advice[destinyNumber] || "Tin tưởng vào con đường của bạn và phát triển những phẩm chất tích cực."

  if (karmicLessons.length > 0) {
    baseAdvice += ` Đặc biệt chú ý phát triển những phẩm chất liên quan đến số ${karmicLessons.join(", ")} để hoàn thiện bản thân.`
  }

  return baseAdvice
}

export function analyzeCompleteName(fullName: string): NameAnalysisResult {
  const destinyNumber = calculateDestinyNumber(fullName)
  const soulUrgeNumber = calculateSoulUrgeNumber(fullName)
  const personalityNumber = calculatePersonalityNumber(fullName)
  const expressionNumber = calculateExpressionNumber(fullName)
  const heartDesireNumber = calculateHeartDesireNumber(fullName)
  const hiddenPassionNumbers = findHiddenPassionNumbers(fullName)
  const karmicLessons = findKarmicLessons(fullName)
  const cornerstone = getCornerstone(fullName)
  const capstone = getCapstone(fullName)
  const firstVowel = getFirstVowel(fullName)
  const nameVibration = getNameVibration(destinyNumber)
  const luckyColors = getLuckyColors(destinyNumber)
  const luckyDays = getLuckyDays(destinyNumber)
  const careerSuggestions = getCareerSuggestions(destinyNumber, personalityNumber)
  const relationshipCompatibility = getRelationshipCompatibility(destinyNumber)
  const personalityTraits = getPersonalityTraits(destinyNumber, personalityNumber)
  const strengths = getStrengths(destinyNumber)
  const challenges = getChallenges(destinyNumber)
  const lifeAdvice = getLifeAdvice(destinyNumber, karmicLessons)

  return {
    fullName,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    expressionNumber,
    heartDesireNumber,
    hiddenPassionNumbers,
    karmicLessons,
    cornerstone,
    capstone,
    firstVowel,
    nameVibration,
    luckyColors,
    luckyDays,
    careerSuggestions,
    relationshipCompatibility,
    personalityTraits,
    strengths,
    challenges,
    lifeAdvice,
  }
}
