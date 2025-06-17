export interface LoveDirection {
  name: string
  element: string
  lovePotential: number
  characteristics: string[]
  activationMethods: string[]
  enhancementObjects: string[]
  colors: string[]
  bestFor: string[]
  relationshipType: string[]
}

export interface LoveAnalysis {
  personalDirection: string
  personalScore: number
  universalCorner: string
  universalScore: number
  flyingStarsLove: string
  flyingStarsScore: number
  overallScore: number
  recommendations: string[]
  enhancementObjects: string[]
  colors: string[]
  relationshipAdvice: string[]
  monthlyAdvice: { month: string; advice: string }[]
  compatibilityTips: string[]
}

export const loveDirections: Record<string, LoveDirection> = {
  north: {
    name: "Bắc",
    element: "Thủy",
    lovePotential: 65,
    characteristics: ["Tình yêu sâu sắc", "Gắn kết lâu dài", "Hiểu biết lẫn nhau"],
    activationMethods: ["Đặt nước chảy nhẹ", "Sử dụng màu xanh đen", "Thêm ánh sáng dịu"],
    enhancementObjects: ["Đôi thiên nga", "Hoa sen", "Nước chảy mini", "Pha lê xanh"],
    colors: ["Xanh đen", "Xanh navy", "Trắng", "Bạc"],
    bestFor: ["Phòng ngủ", "Khu vực thiền định", "Góc yên tĩnh"],
    relationshipType: ["Tình yêu chân thành", "Hôn nhân bền vững", "Hiểu biết sâu sắc"],
  },
  northeast: {
    name: "Đông Bắc",
    element: "Thổ",
    lovePotential: 70,
    characteristics: ["Tình yêu ổn định", "Xây dựng tương lai", "Cam kết lâu dài"],
    activationMethods: ["Đặt đá quý đôi", "Sử dụng màu vàng đất", "Thêm cây cảnh"],
    enhancementObjects: ["Thạch anh hồng", "Cây hạnh phúc", "Tượng đôi", "Đèn muối"],
    colors: ["Vàng đất", "Nâu", "Hồng nhạt", "Cam"],
    bestFor: ["Phòng ngủ chính", "Khu vực học tập", "Góc thiền"],
    relationshipType: ["Tình yêu bền vững", "Hôn nhân truyền thống", "Gia đình hạnh phúc"],
  },
  east: {
    name: "Đông",
    element: "Mộc",
    lovePotential: 80,
    characteristics: ["Tình yêu tươi mới", "Khởi đầu mới", "Năng lượng tích cực"],
    activationMethods: ["Trồng hoa tươi", "Sử dụng màu xanh lá", "Thêm ánh sáng sáng"],
    enhancementObjects: ["Hoa mẫu đơn", "Cây tình yêu", "Chim uyên ương", "Tre phong thủy"],
    colors: ["Xanh lá", "Hồng", "Vàng nhạt", "Trắng"],
    bestFor: ["Phòng khách", "Khu vực sinh hoạt", "Cửa chính"],
    relationshipType: ["Tình yêu mới", "Hẹn hò lãng mạn", "Khởi đầu mối quan hệ"],
  },
  southeast: {
    name: "Đông Nam",
    element: "Mộc",
    lovePotential: 75,
    characteristics: ["Tình yêu thịnh vượng", "Hạnh phúc dồi dào", "Giao tiếp tốt"],
    activationMethods: ["Kích hoạt góc tình yêu", "Đặt hoa tươi", "Sử dụng màu tím"],
    enhancementObjects: ["Hoa lan", "Cây phong thủy", "Pha lê tím", "Nến thơm"],
    colors: ["Tím", "Hồng", "Xanh lá", "Vàng"],
    bestFor: ["Phòng khách", "Khu vực tiếp khách", "Phòng ăn"],
    relationshipType: ["Tình yêu sung túc", "Hôn nhân thịnh vượng", "Gia đình hạnh phúc"],
  },
  south: {
    name: "Nam",
    element: "Hỏa",
    lovePotential: 90,
    characteristics: ["Tình yêu nồng nàn", "Đam mê mãnh liệt", "Thu hút mạnh mẽ"],
    activationMethods: ["Thêm ánh sáng ấm", "Sử dụng màu đỏ", "Đặt nến và hoa"],
    enhancementObjects: ["Hoa hồng đỏ", "Nến đỏ", "Pha lê đỏ", "Chim phượng hoàng"],
    colors: ["Đỏ", "Hồng đậm", "Cam", "Vàng"],
    bestFor: ["Phòng ngủ", "Khu vực lãng mạn", "Phòng khách"],
    relationshipType: ["Tình yêu nồng nhiệt", "Đam mê mãnh liệt", "Hấp dẫn mạnh mẽ"],
  },
  southwest: {
    name: "Tây Nam",
    element: "Thổ",
    lovePotential: 95,
    characteristics: ["Góc tình yêu chính", "Hôn nhân hạnh phúc", "Mối quan hệ bền vững"],
    activationMethods: ["Kích hoạt góc tình yêu", "Đặt đôi vật phẩm", "Sử dụng màu hồng"],
    enhancementObjects: ["Đôi vịt uyên ương", "Thạch anh hồng", "Hoa mẫu đơn", "Tượng đôi"],
    colors: ["Hồng", "Đỏ", "Vàng", "Trắng"],
    bestFor: ["Phòng ngủ chính", "Khu vực tình yêu", "Phòng khách"],
    relationshipType: ["Hôn nhân hạnh phúc", "Tình yêu vĩnh cửu", "Gia đình êm ấm"],
  },
  west: {
    name: "Tây",
    element: "Kim",
    lovePotential: 60,
    characteristics: ["Tình yêu ngọt ngào", "Niềm vui trong tình yêu", "Sáng tạo trong mối quan hệ"],
    activationMethods: ["Đặt kim loại đôi", "Sử dụng màu trắng", "Thêm âm nhạc nhẹ"],
    enhancementObjects: ["Chuông gió", "Hoa trắng", "Pha lê trắng", "Tượng kim loại"],
    colors: ["Trắng", "Bạc", "Hồng nhạt", "Vàng nhạt"],
    bestFor: ["Phòng ngủ", "Khu vực nghỉ ngơi", "Phòng ăn"],
    relationshipType: ["Tình yêu ngọt ngào", "Mối quan hệ vui vẻ", "Hạnh phúc đơn giản"],
  },
  northwest: {
    name: "Tây Bắc",
    element: "Kim",
    lovePotential: 55,
    characteristics: ["Tình yêu chín chắn", "Mối quan hệ có trách nhiệm", "Hỗ trợ lẫn nhau"],
    activationMethods: ["Đặt kim loại quý", "Sử dụng màu vàng kim", "Thêm ánh sáng vàng"],
    enhancementObjects: ["Đồng tiền đôi", "Tượng kim loại", "Pha lê vàng", "Hoa vàng"],
    colors: ["Vàng kim", "Trắng", "Bạc", "Hồng nhạt"],
    bestFor: ["Phòng làm việc", "Khu vực lãnh đạo", "Phòng khách"],
    relationshipType: ["Tình yêu chín chắn", "Hôn nhân có trách nhiệm", "Hỗ trợ sự nghiệp"],
  },
}

export function calculatePersonalLoveDirection(kuaNumber: number): string {
  const loveDirections: Record<number, string> = {
    1: "south",
    2: "southwest",
    3: "southeast",
    4: "east",
    6: "west",
    7: "northwest",
    8: "northeast",
    9: "north",
  }

  return loveDirections[kuaNumber] || "southwest"
}

export function getFlyingStarsLove(year: number): { direction: string; star: number } {
  // Simplified Flying Stars calculation for love star position
  const cycle = (year - 1984) % 20
  const lovePositions = [
    "southwest",
    "south",
    "southeast",
    "east",
    "northeast",
    "north",
    "northwest",
    "west",
    "southwest",
    "south",
    "southeast",
    "east",
    "northeast",
    "north",
    "northwest",
    "west",
    "southwest",
    "south",
    "southeast",
    "east",
  ]

  return {
    direction: lovePositions[cycle],
    star: 4, // Love star number
  }
}

export function generateRelationshipAdvice(personalDirection: string, relationshipStatus: string): string[] {
  const direction = loveDirections[personalDirection]
  const baseAdvice = [
    `Tận dụng năng lượng ${direction.element} để tăng cường tình cảm`,
    `Sử dụng màu ${direction.colors[0]} trong trang phục và trang trí`,
    `Đặt ${direction.enhancementObjects[0]} ở góc ${direction.name}`,
  ]

  const statusAdvice: Record<string, string[]> = {
    single: [
      "Mở rộng mạng lưới xã hội và tham gia các hoạt động nhóm",
      "Tự tin thể hiện bản thân và tỏa sáng năng lượng tích cực",
      "Chuẩn bị tinh thần để đón nhận tình yêu mới",
    ],
    dating: [
      "Tạo không gian riêng tư và lãng mạn cho hai người",
      "Giao tiếp cởi mở và chia sẻ cảm xúc chân thành",
      "Lên kế hoạch cho những hoạt động chung thú vị",
    ],
    married: [
      "Duy trì sự lãng mạn và bất ngờ trong hôn nhân",
      "Tạo truyền thống gia đình và kỷ niệm đặc biệt",
      "Hỗ trợ và động viên nhau trong mọi hoàn cảnh",
    ],
    complicated: [
      "Tìm hiểu rõ nguyên nhân của những khó khăn",
      "Giao tiếp cởi mở và tìm giải pháp chung",
      "Có thể cần thời gian để suy ngẫm và quyết định",
    ],
  }

  return [...baseAdvice, ...statusAdvice[relationshipStatus]]
}

export function generateCompatibilityTips(personalDirection: string): string[] {
  const direction = loveDirections[personalDirection]

  return [
    `Người có hướng ${direction.name} phù hợp với những người có năng lượng ${direction.element}`,
    `Tránh xung đột với những người có ngũ hành khắc ${direction.element}`,
    `Tìm kiếm sự cân bằng giữa các yếu tố Kim, Mộc, Thủy, Hỏa, Thổ`,
    `Chú ý đến chu kỳ năng lượng cá nhân và của đối phương`,
    `Tạo không gian chung phù hợp với cả hai người`,
  ]
}

export function analyzeLoveCorner(
  birthYear: number,
  gender: "male" | "female",
  houseDirection: string,
  relationshipStatus: string,
): LoveAnalysis {
  // Calculate Kua number (reuse from numerology)
  const lastTwoDigits = birthYear % 100
  const sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10)
  const finalSum = sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum

  let kuaNumber: number
  if (gender === "male") {
    kuaNumber = 10 - finalSum
    if (kuaNumber === 5) kuaNumber = 2
  } else {
    kuaNumber = finalSum + 5
    if (kuaNumber > 9) kuaNumber -= 9
    if (kuaNumber === 5) kuaNumber = 8
  }

  const personalDirection = calculatePersonalLoveDirection(kuaNumber)
  const flyingStarsLove = getFlyingStarsLove(new Date().getFullYear())

  const personalLoveDir = loveDirections[personalDirection]
  const universalLoveDir = loveDirections["southwest"]
  const flyingStarsDir = loveDirections[flyingStarsLove.direction]

  // Calculate scores
  const personalScore = personalLoveDir.lovePotential
  const universalScore = universalLoveDir.lovePotential
  const flyingStarsScore = flyingStarsDir.lovePotential
  const overallScore = Math.round(personalScore * 0.4 + universalScore * 0.3 + flyingStarsScore * 0.3)

  // Generate recommendations
  const recommendations = [
    `Kích hoạt góc ${personalLoveDir.name} (hướng cá nhân) với ${personalLoveDir.enhancementObjects[0]}`,
    `Sử dụng màu ${personalLoveDir.colors[0]} và ${personalLoveDir.colors[1]} trong phòng ngủ`,
    `Đặt ${universalLoveDir.enhancementObjects[1]} ở góc Tây Nam (góc tình yêu truyền thống)`,
    `Tận dụng năng lượng sao bay ${flyingStarsLove.star} ở hướng ${flyingStarsDir.name}`,
    `Giữ không gian sạch sẽ và thoáng đãng để thu hút tình yêu`,
  ]

  // Monthly advice
  const monthlyAdvice = [
    { month: "Tháng 1", advice: "Làm sạch góc tình yêu, thay hoa tươi và thắp nến thơm" },
    { month: "Tháng 2", advice: "Tháng tình yêu - trang trí với hoa hồng và quà tặng ý nghĩa" },
    { month: "Tháng 3", advice: "Thêm cây xanh và ánh sáng tự nhiên vào góc tình yêu" },
    { month: "Tháng 4", advice: "Mùa xuân tình yêu - đặt hoa tươi và pha lê hồng" },
    { month: "Tháng 5", advice: "Tăng cường năng lượng với âm nhạc nhẹ nhàng và hương thơm" },
    { month: "Tháng 6", advice: "Mùa cưới - sắp xếp lại không gian để đón nhận tình yêu" },
    { month: "Tháng 7", advice: "Thêm ánh sáng ấm áp và trang trí lãng mạn" },
    { month: "Tháng 8", advice: "Cập nhật và làm mới các biểu tượng tình yêu" },
    { month: "Tháng 9", advice: "Thu hoạch tình yêu - tạo kỷ niệm đẹp với người thương" },
    { month: "Tháng 10", advice: "Mùa thu lãng mạn - thêm màu ấm và nến thơm" },
    { month: "Tháng 11", advice: "Chuẩn bị cho mùa đông với không gian ấm cúng" },
    { month: "Tháng 12", advice: "Kết thúc năm với lời cảm ơn và kế hoạch tình yêu mới" },
  ]

  const relationshipAdvice = generateRelationshipAdvice(personalDirection, relationshipStatus)
  const compatibilityTips = generateCompatibilityTips(personalDirection)

  return {
    personalDirection: personalLoveDir.name,
    personalScore,
    universalCorner: universalLoveDir.name,
    universalScore,
    flyingStarsLove: flyingStarsDir.name,
    flyingStarsScore,
    overallScore,
    recommendations,
    enhancementObjects: [...personalLoveDir.enhancementObjects, ...universalLoveDir.enhancementObjects].slice(0, 8),
    colors: [...personalLoveDir.colors, ...universalLoveDir.colors].slice(0, 6),
    relationshipAdvice,
    monthlyAdvice,
    compatibilityTips,
  }
}
