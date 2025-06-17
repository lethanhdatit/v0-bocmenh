// Business name numerology analysis utilities

export interface BusinessNameAnalysisResult {
  businessName: string
  businessType: string
  ownerBirthDate?: string
  destinyNumber: number
  expressionNumber: number
  personalityNumber: number
  soulNumber: number
  successNumber: number
  brandVibration: string
  luckyColors: string[]
  luckyNumbers: number[]
  favorableDays: string[]
  businessStrengths: string[]
  potentialChallenges: string[]
  marketingAdvice: string[]
  financialOutlook: string
  customerAttraction: string
  competitiveAdvantage: string[]
  recommendedIndustries: string[]
  brandingTips: string[]
  launchTiming: string
  partnershipCompatibility: string[]
  overallScore: number
  detailedAnalysis: string
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

const vowels = ["A", "E", "I", "O", "U", "Y"]
const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]

export function reduceToSingleDigit(num: number): number {
  // Master numbers (11, 22, 33) are not reduced for business analysis
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

export function calculateBusinessDestinyNumber(businessName: string): number {
  const cleanName = businessName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    sum += letterValues[letter] || 0
  }

  return reduceToSingleDigit(sum)
}

export function calculateBusinessExpressionNumber(businessName: string): number {
  // Same as destiny number for business
  return calculateBusinessDestinyNumber(businessName)
}

export function calculateBusinessPersonalityNumber(businessName: string): number {
  const cleanName = businessName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    if (consonants.includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

export function calculateBusinessSoulNumber(businessName: string): number {
  const cleanName = businessName.toUpperCase().replace(/[^A-Z]/g, "")
  let sum = 0

  for (const letter of cleanName) {
    if (vowels.includes(letter)) {
      sum += letterValues[letter] || 0
    }
  }

  return reduceToSingleDigit(sum)
}

export function calculateSuccessNumber(destinyNumber: number, personalityNumber: number): number {
  return reduceToSingleDigit(destinyNumber + personalityNumber)
}

export function getBusinessVibration(destinyNumber: number): string {
  const vibrations: Record<number, string> = {
    1: "Năng lượng tiên phong và lãnh đạo thị trường",
    2: "Năng lượng hợp tác và dịch vụ khách hàng",
    3: "Năng lượng sáng tạo và truyền thông",
    4: "Năng lượng ổn định và xây dựng thương hiệu",
    5: "Năng lượng đổi mới và mở rộng",
    6: "Năng lượng chăm sóc và trách nhiệm xã hội",
    7: "Năng lượng chuyên môn và nghiên cứu",
    8: "Năng lượng thành công tài chính và quyền lực",
    9: "Năng lượng phục vụ cộng đồng và nhân đạo",
    11: "Năng lượng truyền cảm hứng và đổi mới",
    22: "Năng lượng xây dựng đế chế kinh doanh",
    33: "Năng lượng chữa lành và giáo dục",
  }

  return vibrations[destinyNumber] || "Năng lượng kinh doanh đặc biệt"
}

export function getBusinessLuckyColors(destinyNumber: number): string[] {
  const colorMap: Record<number, string[]> = {
    1: ["Đỏ", "Cam", "Vàng kim", "Đồng"],
    2: ["Xanh lam", "Bạc", "Trắng", "Xám nhạt"],
    3: ["Vàng", "Cam", "Hồng", "Tím nhạt"],
    4: ["Xanh lá", "Nâu", "Be", "Xám"],
    5: ["Bạc", "Xám", "Xanh dương", "Trắng"],
    6: ["Xanh lá", "Hồng", "Xanh navy", "Kem"],
    7: ["Tím", "Xanh lam đậm", "Trắng", "Bạc"],
    8: ["Đen", "Nâu đậm", "Vàng", "Đỏ đậm"],
    9: ["Đỏ", "Hồng", "Cam", "Vàng"],
    11: ["Bạc", "Trắng", "Xanh lam nhạt", "Vàng nhạt"],
    22: ["Đỏ đậm", "Nâu", "Vàng kim", "Đen"],
    33: ["Vàng", "Xanh lá", "Tím", "Trắng"],
  }

  return colorMap[destinyNumber] || ["Trắng", "Bạc", "Xanh"]
}

export function getBusinessLuckyNumbers(destinyNumber: number): number[] {
  const baseNumbers = [destinyNumber]

  // Add compatible numbers
  const compatibleMap: Record<number, number[]> = {
    1: [1, 10, 19, 28],
    2: [2, 11, 20, 29],
    3: [3, 12, 21, 30],
    4: [4, 13, 22, 31],
    5: [5, 14, 23, 32],
    6: [6, 15, 24, 33],
    7: [7, 16, 25, 34],
    8: [8, 17, 26, 35],
    9: [9, 18, 27, 36],
    11: [11, 29, 38, 47],
    22: [22, 40, 49, 58],
    33: [33, 51, 60, 69],
  }

  return compatibleMap[destinyNumber] || [destinyNumber]
}

export function getFavorableDays(destinyNumber: number): string[] {
  const dayMap: Record<number, string[]> = {
    1: ["Chủ nhật", "Thứ hai", "Ngày 1, 10, 19, 28"],
    2: ["Thứ hai", "Thứ sáu", "Ngày 2, 11, 20, 29"],
    3: ["Thứ ba", "Thứ năm", "Ngày 3, 12, 21, 30"],
    4: ["Thứ tư", "Thứ bảy", "Ngày 4, 13, 22, 31"],
    5: ["Thứ năm", "Chủ nhật", "Ngày 5, 14, 23"],
    6: ["Thứ sáu", "Thứ ba", "Ngày 6, 15, 24"],
    7: ["Thứ bảy", "Thứ tư", "Ngày 7, 16, 25"],
    8: ["Thứ bảy", "Thứ hai", "Ngày 8, 17, 26"],
    9: ["Thứ ba", "Thứ năm", "Ngày 9, 18, 27"],
    11: ["Thứ hai", "Thứ sáu", "Ngày 11, 29"],
    22: ["Thứ bảy", "Thứ hai", "Ngày 22"],
    33: ["Thứ sáu", "Thứ ba", "Ngày 6, 15, 24"],
  }

  return dayMap[destinyNumber] || ["Chủ nhật"]
}

export function getBusinessStrengths(destinyNumber: number, personalityNumber: number): string[] {
  const strengthsMap: Record<number, string[]> = {
    1: ["Khả năng lãnh đạo thị trường", "Tinh thần tiên phong", "Sáng tạo sản phẩm", "Quyết đoán trong kinh doanh"],
    2: ["Dịch vụ khách hàng xuất sắc", "Khả năng hợp tác", "Xây dựng mối quan hệ", "Trực giác kinh doanh"],
    3: ["Marketing sáng tạo", "Giao tiếp hiệu quả", "Xây dựng thương hiệu", "Thu hút khách hàng"],
    4: ["Quản lý tài chính tốt", "Xây dựng hệ thống", "Độ tin cậy cao", "Phát triển bền vững"],
    5: ["Thích ứng thị trường nhanh", "Đổi mới liên tục", "Mở rộng địa lý", "Công nghệ tiên tiến"],
    6: ["Trách nhiệm xã hội", "Chăm sóc nhân viên", "Sản phẩm chất lượng", "Lòng trung thành khách hàng"],
    7: ["Chuyên môn cao", "Nghiên cứu phát triển", "Chất lượng cao cấp", "Thương hiệu uy tín"],
    8: ["Thành công tài chính", "Quản lý hiệu quả", "Mở rộng quy mô", "Ảnh hưởng thị trường"],
    9: ["Tầm nhìn rộng", "Trách nhiệm xã hội", "Thương hiệu nhân văn", "Ảnh hưởng tích cực"],
    11: ["Truyền cảm hứng", "Đổi mới đột phá", "Tầm nhìn tương lai", "Lãnh đạo tinh thần"],
    22: ["Xây dựng đế chế", "Tầm nhìn lớn", "Thực hiện dự án khủng", "Ảnh hưởng toàn cầu"],
    33: ["Chữa lành thị trường", "Giáo dục khách hàng", "Sứ mệnh cao cả", "Thay đổi tích cực"],
  }

  return strengthsMap[destinyNumber] || ["Tiềm năng kinh doanh đặc biệt"]
}

export function getPotentialChallenges(destinyNumber: number): string[] {
  const challengesMap: Record<number, string[]> = {
    1: ["Có thể quá độc đoán", "Khó hợp tác với đối tác", "Thiếu kiên nhẫn", "Cạnh tranh quá khốc liệt"],
    2: ["Thiếu quyết đoán", "Dễ bị ảnh hưởng", "Tránh rủi ro quá mức", "Phụ thuộc vào người khác"],
    3: ["Thiếu tập trung", "Chi tiêu không kiểm soát", "Quá cảm tính", "Thiếu kỷ luật tài chính"],
    4: ["Quá thận trọng", "Chậm thích ứng", "Thiếu linh hoạt", "Kháng cự thay đổi"],
    5: ["Thiếu kiên nhẫn", "Thay đổi quá nhiều", "Khó tập trung", "Rủi ro cao"],
    6: ["Quá lo lắng", "Chi phí cao cho nhân viên", "Hoàn hảo chủ nghĩa", "Khó từ chối"],
    7: ["Quá hướng nội", "Khó tiếp cận khách hàng", "Thiếu marketing", "Cô lập thị trường"],
    8: ["Quá tập trung lợi nhuận", "Căng thẳng cao", "Bỏ qua con người", "Áp lực thành công"],
    9: ["Quá lý tưởng", "Thiếu thực tế", "Chi phí xã hội cao", "Dễ thất vọng"],
    11: ["Áp lực cao", "Khó thực hiện", "Quá lý tưởng", "Căng thẳng tinh thần"],
    22: ["Áp lực khổng lồ", "Khó quản lý", "Rủi ro cao", "Thách thức lớn"],
    33: ["Gánh nặng trách nhiệm", "Chi phí cao", "Khó sinh lời", "Áp lực xã hội"],
  }

  return challengesMap[destinyNumber] || ["Thách thức kinh doanh đặc biệt"]
}

export function getMarketingAdvice(destinyNumber: number, personalityNumber: number): string[] {
  const marketingMap: Record<number, string[]> = {
    1: ["Nhấn mạnh tính tiên phong", "Thương hiệu mạnh mẽ", "Lãnh đạo thị trường", "Sản phẩm đột phá"],
    2: ["Tập trung dịch vụ khách hàng", "Xây dựng cộng đồng", "Hợp tác chiến lược", "Tin cậy và uy tín"],
    3: ["Marketing sáng tạo", "Nội dung hấp dẫn", "Truyền thông xã hội", "Sự kiện và giải trí"],
    4: ["Nhấn mạnh chất lượng", "Độ tin cậy", "Lịch sử thương hiệu", "Cam kết dài hạn"],
    5: ["Đổi mới liên tục", "Công nghệ mới", "Trải nghiệm đa dạng", "Tiếp cận đa kênh"],
    6: ["Trách nhiệm xã hội", "Chăm sóc khách hàng", "Giá trị gia đình", "Cộng đồng địa phương"],
    7: ["Chuyên môn cao", "Giáo dục khách hàng", "Chất lượng cao cấp", "Thương hiệu uy tín"],
    8: ["Thành công và uy tín", "Chất lượng cao cấp", "Độc quyền", "Đẳng cấp thương gia"],
    9: ["Sứ mệnh nhân văn", "Tác động xã hội", "Giá trị toàn cầu", "Truyền cảm hứng"],
    11: ["Tầm nhìn tương lai", "Đổi mới đột phá", "Truyền cảm hứng", "Lãnh đạo tư tưởng"],
    22: ["Tầm nhìn lớn", "Dự án khủng", "Ảnh hưởng toàn cầu", "Xây dựng di sản"],
    33: ["Sứ mệnh chữa lành", "Giáo dục và phát triển", "Thay đổi tích cực", "Giá trị tinh thần"],
  }

  return marketingMap[destinyNumber] || ["Chiến lược marketing đặc biệt"]
}

export function getFinancialOutlook(destinyNumber: number, successNumber: number): string {
  const outlookMap: Record<number, string> = {
    1: "Tiềm năng tài chính cao với khả năng tăng trưởng nhanh. Thành công thông qua sự đổi mới và lãnh đạo.",
    2: "Tăng trưởng tài chính ổn định thông qua hợp tác và dịch vụ. Thu nhập đều đặn từ mối quan hệ lâu dài.",
    3: "Thu nhập biến động nhưng có tiềm năng cao. Thành công thông qua sáng tạo và marketing hiệu quả.",
    4: "Tăng trưởng tài chính chậm nhưng bền vững. Xây dựng tài sản vững chắc theo thời gian.",
    5: "Thu nhập có thể thay đổi nhiều. Cơ hội tài chính từ việc mở rộng và đổi mới.",
    6: "Tài chính ổn định với focus vào chất lượng. Thu nhập tốt từ việc phục vụ cộng đồng.",
    7: "Tiềm năng tài chính cao trong lĩnh vực chuyên môn. Thu nhập từ kiến thức và chuyên môn.",
    8: "Tiềm năng tài chính rất cao. Khả năng tạo ra tài sản lớn và thành công vượt trội.",
    9: "Tài chính thông qua phục vụ cộng đồng. Thu nhập từ các dự án có ý nghĩa xã hội.",
    11: "Tiềm năng tài chính cao thông qua đổi mới. Thu nhập từ việc truyền cảm hứng và lãnh đạo.",
    22: "Tiềm năng tạo ra tài sản khổng lồ. Thành công tài chính ở quy mô lớn.",
    33: "Tài chính thông qua sứ mệnh cao cả. Thu nhập từ việc chữa lành và giáo dục.",
  }

  return outlookMap[destinyNumber] || "Tiềm năng tài chính đặc biệt cần được phát triển đúng cách."
}

export function getCustomerAttraction(personalityNumber: number): string {
  const attractionMap: Record<number, string> = {
    1: "Thu hút khách hàng muốn dẫn đầu và đổi mới. Khách hàng đánh giá cao tính tiên phong.",
    2: "Thu hút khách hàng cần sự hỗ trợ và dịch vụ tận tâm. Khách hàng trung thành lâu dài.",
    3: "Thu hút khách hàng yêu thích sự sáng tạo và giải trí. Khách hàng trẻ và năng động.",
    4: "Thu hút khách hàng cần sự ổn định và tin cậy. Khách hàng đánh giá cao chất lượng.",
    5: "Thu hút khách hàng yêu thích sự đổi mới và trải nghiệm mới. Khách hàng năng động.",
    6: "Thu hút khách hàng cần sự chăm sóc và quan tâm. Khách hàng gia đình và cộng đồng.",
    7: "Thu hút khách hàng cần chuyên môn cao. Khách hàng am hiểu và có yêu cầu cao.",
    8: "Thu hút khách hàng thành công và có địa vị. Khách hàng cao cấp và có sức mua.",
    9: "Thu hút khách hàng có ý thức xã hội. Khách hàng quan tâm đến giá trị nhân văn.",
  }

  return attractionMap[personalityNumber] || "Thu hút khách hàng đặc biệt với nhu cầu riêng biệt."
}

export function getCompetitiveAdvantage(destinyNumber: number, soulNumber: number): string[] {
  const advantageMap: Record<number, string[]> = {
    1: ["Tiên phong trong ngành", "Sản phẩm độc đáo", "Lãnh đạo thị trường", "Tốc độ ra quyết định"],
    2: ["Dịch vụ khách hàng xuất sắc", "Mối quan hệ bền vững", "Hợp tác chiến lược", "Hiểu biết khách hàng"],
    3: ["Sáng tạo marketing", "Thương hiệu ấn tượng", "Giao tiếp hiệu quả", "Nội dung hấp dẫn"],
    4: ["Chất lượng ổn định", "Quy trình hoàn hảo", "Độ tin cậy cao", "Quản lý hiệu quả"],
    5: ["Thích ứng nhanh", "Đổi mới liên tục", "Công nghệ tiên tiến", "Linh hoạt thị trường"],
    6: ["Trách nhiệm xã hội", "Chăm sóc nhân viên", "Giá trị cộng đồng", "Lòng trung thành"],
    7: ["Chuyên môn sâu", "Nghiên cứu phát triển", "Chất lượng cao cấp", "Uy tín chuyên môn"],
    8: ["Năng lực tài chính", "Quản lý chuyên nghiệp", "Mạng lưới rộng", "Ảnh hưởng thị trường"],
    9: ["Tầm nhìn nhân văn", "Giá trị xã hội", "Thương hiệu có ý nghĩa", "Tác động tích cực"],
  }

  return advantageMap[destinyNumber] || ["Lợi thế cạnh tranh đặc biệt"]
}

export function getRecommendedIndustries(destinyNumber: number, businessType: string): string[] {
  const industryMap: Record<number, string[]> = {
    1: ["Công nghệ", "Khởi nghiệp", "Lãnh đạo", "Đổi mới", "Tài chính"],
    2: ["Dịch vụ", "Tư vấn", "Y tế", "Giáo dục", "Hỗ trợ khách hàng"],
    3: ["Truyền thông", "Giải trí", "Nghệ thuật", "Marketing", "Thời trang"],
    4: ["Xây dựng", "Sản xuất", "Ngân hàng", "Bất động sản", "Kế toán"],
    5: ["Du lịch", "Công nghệ", "Truyền thông", "Vận tải", "Thương mại điện tử"],
    6: ["Y tế", "Giáo dục", "Dịch vụ xã hội", "Thực phẩm", "Chăm sóc"],
    7: ["Nghiên cứu", "Công nghệ cao", "Tư vấn chuyên môn", "Y học", "Khoa học"],
    8: ["Tài chính", "Bất động sản", "Luật", "Quản lý", "Đầu tư"],
    9: ["Từ thiện", "Giáo dục", "Y tế", "Môi trường", "Nghệ thuật"],
  }

  return industryMap[destinyNumber] || ["Đa ngành nghề phù hợp"]
}

export function getBrandingTips(destinyNumber: number, personalityNumber: number): string[] {
  const brandingMap: Record<number, string[]> = {
    1: ["Logo mạnh mẽ và đơn giản", "Slogan về lãnh đạo", "Màu sắc nổi bật", "Thông điệp tiên phong"],
    2: ["Logo hài hòa và thân thiện", "Slogan về hợp tác", "Màu sắc dịu nhẹ", "Thông điệp tin cậy"],
    3: ["Logo sáng tạo và màu sắc", "Slogan vui tươi", "Thiết kế nghệ thuật", "Thông điệp sáng tạo"],
    4: ["Logo cổ điển và ổn định", "Slogan về chất lượng", "Màu sắc truyền thống", "Thông điệp tin cậy"],
    5: ["Logo hiện đại và linh hoạt", "Slogan về đổi mới", "Màu sắc năng động", "Thông điệp tự do"],
    6: ["Logo ấm áp và chăm sóc", "Slogan về trách nhiệm", "Màu sắc tự nhiên", "Thông điệp quan tâm"],
    7: ["Logo tinh tế và chuyên nghiệp", "Slogan về chuyên môn", "Màu sắc sang trọng", "Thông điệp uy tín"],
    8: ["Logo quyền lực và thành công", "Slogan về thành tựu", "Màu sắc đẳng cấp", "Thông điệp thành công"],
    9: ["Logo nhân văn và rộng lớn", "Slogan về phục vụ", "Màu sắc ấm áp", "Thông điệp ý nghĩa"],
  }

  return brandingMap[destinyNumber] || ["Thương hiệu độc đáo và đặc biệt"]
}

export function getLaunchTiming(destinyNumber: number): string {
  const timingMap: Record<number, string> = {
    1: "Khởi động vào đầu tháng, đầu năm hoặc ngày có số 1. Tránh ngày 4, 8.",
    2: "Khởi động vào ngày chẵn, đặc biệt ngày 2, 11, 20, 29. Tránh ngày 1, 8.",
    3: "Khởi động vào ngày 3, 12, 21, 30. Thích hợp vào mùa xuân và mùa hè.",
    4: "Khởi động vào ngày 4, 13, 22, 31. Thích hợp vào mùa thu và đông.",
    5: "Khởi động vào ngày 5, 14, 23. Thích hợp vào thời điểm thay đổi mùa.",
    6: "Khởi động vào ngày 6, 15, 24. Thích hợp vào các dịp lễ gia đình.",
    7: "Khởi động vào ngày 7, 16, 25. Thích hợp vào thời gian yên tĩnh.",
    8: "Khởi động vào ngày 8, 17, 26. Thích hợp vào thời điểm kinh tế tốt.",
    9: "Khởi động vào ngày 9, 18, 27. Thích hợp vào các dịp có ý nghĩa.",
  }

  return timingMap[destinyNumber] || "Chọn thời điểm phù hợp với năng lượng doanh nghiệp."
}

export function getPartnershipCompatibility(destinyNumber: number): string[] {
  const compatibilityMap: Record<number, string[]> = {
    1: ["Hợp tác tốt với số 3, 5, 6", "Tránh hợp tác với số 1, 8", "Bổ sung với số 2, 4"],
    2: ["Hợp tác tốt với số 1, 4, 6", "Tránh hợp tác với số 5, 7", "Bổ sung với số 8, 9"],
    3: ["Hợp tác tốt với số 1, 5, 9", "Tránh hợp tác với số 4, 8", "Bổ sung với số 2, 6"],
    4: ["Hợp tác tốt với số 2, 6, 8", "Tránh hợp tác với số 3, 5", "Bổ sung với số 1, 7"],
    5: ["Hợp tác tốt với số 1, 3, 7", "Tránh hợp tác với số 2, 4", "Bổ sung với số 6, 9"],
    6: ["Hợp tác tốt với số 2, 4, 9", "Tránh hợp tác với số 1, 5", "Bổ sung với số 3, 8"],
    7: ["Hợp tác tốt với số 5, 7, 9", "Tránh hợp tác với số 2, 6", "Bổ sung với số 1, 4"],
    8: ["Hợp tác tốt với số 4, 6, 8", "Tránh hợp tác với số 1, 3", "Bổ sung với số 2, 9"],
    9: ["Hợp tác tốt với số 3, 6, 7", "Tránh hợp tác với số 4, 8", "Bổ sung với số 1, 5"],
  }

  return compatibilityMap[destinyNumber] || ["Tương hợp đặc biệt cần phân tích cụ thể"]
}

export function calculateOverallScore(
  destinyNumber: number,
  personalityNumber: number,
  soulNumber: number,
  businessType: string,
): number {
  let score = 50 // Base score

  // Destiny number influence (30%)
  if ([1, 8, 9, 11, 22].includes(destinyNumber)) score += 15
  else if ([3, 5, 6].includes(destinyNumber)) score += 10
  else score += 5

  // Personality number influence (20%)
  if ([1, 3, 8].includes(personalityNumber)) score += 10
  else if ([2, 6, 9].includes(personalityNumber)) score += 8
  else score += 5

  // Soul number influence (15%)
  if ([1, 5, 8].includes(soulNumber)) score += 8
  else score += 5

  // Business type compatibility (10%)
  score += 5

  // Random factor for uniqueness (5%)
  score += Math.floor(Math.random() * 5)

  return Math.min(score, 95) // Cap at 95
}

export function generateDetailedAnalysis(result: BusinessNameAnalysisResult): string {
  const { businessName, destinyNumber, personalityNumber, soulNumber, overallScore } = result

  let analysis = `Phân tích chi tiết cho doanh nghiệp "${businessName}":\n\n`

  analysis += `🎯 Số Định Mệnh ${destinyNumber}: ${getBusinessVibration(destinyNumber)}\n`
  analysis += `Đây là năng lượng cốt lõi của doanh nghiệp, định hướng sứ mệnh và mục tiêu chính.\n\n`

  analysis += `👥 Số Cá Tính ${personalityNumber}: Thể hiện cách thức doanh nghiệp tương tác với thị trường và khách hàng.\n`
  analysis += `Số này ảnh hưởng đến hình ảnh thương hiệu và cách khách hàng nhận thức về doanh nghiệp.\n\n`

  analysis += `💝 Số Linh Hồn ${soulNumber}: Động lực sâu xa và giá trị cốt lõi của doanh nghiệp.\n`
  analysis += `Số này thể hiện những gì thực sự quan trọng với doanh nghiệp và nhân viên.\n\n`

  if (overallScore >= 80) {
    analysis += `⭐ Với điểm số ${overallScore}/100, tên doanh nghiệp này có tiềm năng rất cao cho thành công.\n`
    analysis += `Sự kết hợp các con số tạo ra một năng lượng mạnh mẽ và hài hòa.\n\n`
  } else if (overallScore >= 60) {
    analysis += `✅ Với điểm số ${overallScore}/100, tên doanh nghiệp này có tiềm năng tốt.\n`
    analysis += `Cần tập trung vào những điểm mạnh và khắc phục những thách thức.\n\n`
  } else {
    analysis += `⚠️ Với điểm số ${overallScore}/100, tên doanh nghiệp này cần được cân nhắc kỹ lưỡng.\n`
    analysis += `Nên xem xét điều chỉnh tên hoặc tăng cường các yếu tố hỗ trợ khác.\n\n`
  }

  analysis += `💡 Lời khuyên: Sử dụng những thông tin này để xây dựng chiến lược kinh doanh, `
  analysis += `marketing và phát triển thương hiệu phù hợp với năng lượng tự nhiên của doanh nghiệp.`

  return analysis
}

export function analyzeBusinessName(
  businessName: string,
  businessType: string,
  ownerBirthDate?: string,
): BusinessNameAnalysisResult {
  const destinyNumber = calculateBusinessDestinyNumber(businessName)
  const expressionNumber = calculateBusinessExpressionNumber(businessName)
  const personalityNumber = calculateBusinessPersonalityNumber(businessName)
  const soulNumber = calculateBusinessSoulNumber(businessName)
  const successNumber = calculateSuccessNumber(destinyNumber, personalityNumber)
  const brandVibration = getBusinessVibration(destinyNumber)
  const luckyColors = getBusinessLuckyColors(destinyNumber)
  const luckyNumbers = getBusinessLuckyNumbers(destinyNumber)
  const favorableDays = getFavorableDays(destinyNumber)
  const businessStrengths = getBusinessStrengths(destinyNumber, personalityNumber)
  const potentialChallenges = getPotentialChallenges(destinyNumber)
  const marketingAdvice = getMarketingAdvice(destinyNumber, personalityNumber)
  const financialOutlook = getFinancialOutlook(destinyNumber, successNumber)
  const customerAttraction = getCustomerAttraction(personalityNumber)
  const competitiveAdvantage = getCompetitiveAdvantage(destinyNumber, soulNumber)
  const recommendedIndustries = getRecommendedIndustries(destinyNumber, businessType)
  const brandingTips = getBrandingTips(destinyNumber, personalityNumber)
  const launchTiming = getLaunchTiming(destinyNumber)
  const partnershipCompatibility = getPartnershipCompatibility(destinyNumber)
  const overallScore = calculateOverallScore(destinyNumber, personalityNumber, soulNumber, businessType)

  const result: BusinessNameAnalysisResult = {
    businessName,
    businessType,
    ownerBirthDate,
    destinyNumber,
    expressionNumber,
    personalityNumber,
    soulNumber,
    successNumber,
    brandVibration,
    luckyColors,
    luckyNumbers,
    favorableDays,
    businessStrengths,
    potentialChallenges,
    marketingAdvice,
    financialOutlook,
    customerAttraction,
    competitiveAdvantage,
    recommendedIndustries,
    brandingTips,
    launchTiming,
    partnershipCompatibility,
    overallScore,
    detailedAnalysis: "",
  }

  result.detailedAnalysis = generateDetailedAnalysis(result)

  return result
}
