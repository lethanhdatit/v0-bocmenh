export interface WealthDirection {
  name: string
  element: string
  wealthPotential: number
  characteristics: string[]
  activationMethods: string[]
  enhancementObjects: string[]
  colors: string[]
  bestFor: string[]
}

export interface WealthAnalysis {
  personalDirection: string
  personalScore: number
  universalCorner: string
  universalScore: number
  flyingStarsWealth: string
  flyingStarsScore: number
  overallScore: number
  recommendations: string[]
  enhancementObjects: string[]
  colors: string[]
  monthlyAdvice: { month: string; advice: string }[]
}

export const wealthDirections: Record<string, WealthDirection> = {
  north: {
    name: "Bắc",
    element: "Thủy",
    wealthPotential: 75,
    characteristics: ["Dòng chảy tài chính", "Thu nhập ổn định", "Đầu tư thông minh"],
    activationMethods: ["Đặt nước chảy", "Sử dụng màu xanh đen", "Thêm kim loại"],
    enhancementObjects: ["Thác nước mini", "Bể cá", "Gương tròn", "Đồng tiền cổ"],
    colors: ["Xanh đen", "Xanh navy", "Bạc", "Trắng"],
    bestFor: ["Phòng khách", "Văn phòng", "Khu vực làm việc"],
  },
  northeast: {
    name: "Đông Bắc",
    element: "Thổ",
    wealthPotential: 60,
    characteristics: ["Tích lũy từ từ", "Đầu tư bất động sản", "Tiết kiệm lâu dài"],
    activationMethods: ["Đặt đá quý", "Sử dụng màu vàng", "Thêm cây cảnh"],
    enhancementObjects: ["Thạch anh vàng", "Cây kim tiền", "Tượng Phật Di Lặc", "Hũ tiền"],
    colors: ["Vàng", "Nâu", "Cam", "Đỏ"],
    bestFor: ["Phòng ngủ", "Khu vực thiền định", "Góc học tập"],
  },
  east: {
    name: "Đông",
    element: "Mộc",
    wealthPotential: 85,
    characteristics: ["Tăng trưởng nhanh", "Cơ hội mới", "Khởi nghiệp thành công"],
    activationMethods: ["Trồng cây xanh", "Sử dụng màu xanh lá", "Thêm nước"],
    enhancementObjects: ["Cây phát tài", "Tre phong thủy", "Rồng xanh", "Cây kim tiền"],
    colors: ["Xanh lá", "Xanh lục", "Nâu gỗ", "Xanh đen"],
    bestFor: ["Phòng khách", "Khu vực làm việc", "Cửa chính"],
  },
  southeast: {
    name: "Đông Nam",
    element: "Mộc",
    wealthPotential: 95,
    characteristics: ["Góc tài lộc chính", "Thịnh vượng lâu dài", "Tài chính dồi dào"],
    activationMethods: ["Kích hoạt góc tài lộc", "Đặt cây xanh", "Sử dụng màu tím"],
    enhancementObjects: ["Cây kim tiền", "Thuyền buồm vàng", "Rồng vàng", "Đá thạch anh tím"],
    colors: ["Tím", "Xanh lá", "Vàng", "Đỏ"],
    bestFor: ["Phòng khách", "Phòng làm việc", "Khu vực chính"],
  },
  south: {
    name: "Nam",
    element: "Hỏa",
    wealthPotential: 70,
    characteristics: ["Danh tiếng và tài lộc", "Thành công nhanh chóng", "Cơ hội thăng tiến"],
    activationMethods: ["Thêm ánh sáng", "Sử dụng màu đỏ", "Đặt pha lê"],
    enhancementObjects: ["Đèn pha lê", "Tượng ngựa", "Chim phượng hoàng", "Nến đỏ"],
    colors: ["Đỏ", "Cam", "Vàng", "Tím"],
    bestFor: ["Phòng khách", "Khu vực tiếp khách", "Phòng làm việc"],
  },
  southwest: {
    name: "Tây Nam",
    element: "Thổ",
    wealthPotential: 65,
    characteristics: ["Tài lộc từ mối quan hệ", "Hợp tác kinh doanh", "Thu nhập từ đối tác"],
    activationMethods: ["Đặt đôi vật phẩm", "Sử dụng màu hồng", "Thêm đất sét"],
    enhancementObjects: ["Đôi vịt uyên ương", "Thạch anh hồng", "Cây hạnh phúc", "Tượng đôi"],
    colors: ["Hồng", "Vàng", "Nâu", "Đỏ"],
    bestFor: ["Phòng ngủ", "Khu vực tình yêu", "Phòng khách"],
  },
  west: {
    name: "Tây",
    element: "Kim",
    wealthPotential: 55,
    characteristics: ["Thu hoạch thành quả", "Tài chính ổn định", "Lợi nhuận từ kinh nghiệm"],
    activationMethods: ["Đặt kim loại", "Sử dụng màu trắng", "Thêm đồ gốm"],
    enhancementObjects: ["Đồng tiền vàng", "Tượng kim loại", "Chuông gió", "Đá trắng"],
    colors: ["Trắng", "Bạc", "Vàng", "Xám"],
    bestFor: ["Phòng ngủ", "Khu vực nghỉ ngơi", "Phòng ăn"],
  },
  northwest: {
    name: "Tây Bắc",
    element: "Kim",
    wealthPotential: 80,
    characteristics: ["Tài lộc từ người giúp đỡ", "Thành công trong lãnh đạo", "Quyền lực và tiền bạc"],
    activationMethods: ["Đặt kim loại quý", "Sử dụng màu vàng kim", "Thêm đá quý"],
    enhancementObjects: ["Rồng vàng", "Tượng Quan Công", "Đồng tiền cổ", "Kim loại quý"],
    colors: ["Vàng kim", "Trắng", "Bạc", "Xám"],
    bestFor: ["Phòng làm việc", "Khu vực lãnh đạo", "Phòng khách"],
  },
}

export function calculateKuaNumber(birthYear: number, gender: "male" | "female"): number {
  const lastTwoDigits = birthYear % 100
  const sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10)
  const finalSum = sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum

  let kua: number
  if (gender === "male") {
    kua = 10 - finalSum
    if (kua === 5) kua = 2
  } else {
    kua = finalSum + 5
    if (kua > 9) kua -= 9
    if (kua === 5) kua = 8
  }

  return kua
}

export function getPersonalWealthDirection(kuaNumber: number): string {
  const wealthDirections: Record<number, string> = {
    1: "southeast",
    2: "northeast",
    3: "south",
    4: "north",
    6: "west",
    7: "northwest",
    8: "southwest",
    9: "east",
  }

  return wealthDirections[kuaNumber] || "southeast"
}

export function getFlyingStarsWealth(year: number): { direction: string; star: number } {
  // Simplified Flying Stars calculation for wealth star position
  const cycle = (year - 1984) % 20
  const wealthPositions = [
    "southeast",
    "east",
    "northeast",
    "south",
    "north",
    "southwest",
    "west",
    "northwest",
    "southeast",
    "east",
    "northeast",
    "south",
    "north",
    "southwest",
    "west",
    "northwest",
    "southeast",
    "east",
    "northeast",
    "south",
  ]

  return {
    direction: wealthPositions[cycle],
    star: 8, // Wealth star number
  }
}

export function analyzeWealthCorner(
  birthYear: number,
  gender: "male" | "female",
  houseDirection: string,
  roomType: string,
): WealthAnalysis {
  const kuaNumber = calculateKuaNumber(birthYear, gender)
  const personalDirection = getPersonalWealthDirection(kuaNumber)
  const flyingStarsWealth = getFlyingStarsWealth(new Date().getFullYear())

  const personalWealthDir = wealthDirections[personalDirection]
  const universalWealthDir = wealthDirections["southeast"]
  const flyingStarsDir = wealthDirections[flyingStarsWealth.direction]

  // Calculate scores
  const personalScore = personalWealthDir.wealthPotential
  const universalScore = universalWealthDir.wealthPotential
  const flyingStarsScore = flyingStarsDir.wealthPotential
  const overallScore = Math.round(personalScore * 0.4 + universalScore * 0.3 + flyingStarsScore * 0.3)

  // Generate recommendations
  const recommendations = [
    `Kích hoạt góc ${personalWealthDir.name} (hướng cá nhân) với ${personalWealthDir.enhancementObjects[0]}`,
    `Sử dụng màu ${personalWealthDir.colors[0]} và ${personalWealthDir.colors[1]} trong không gian`,
    `Đặt ${universalWealthDir.enhancementObjects[1]} ở góc Đông Nam (góc tài lộc truyền thống)`,
    `Tận dụng năng lượng sao bay ${flyingStarsWealth.star} ở hướng ${flyingStarsDir.name}`,
    `Giữ khu vực ${roomType} sạch sẽ và thoáng đãng để thu hút tài lộc`,
  ]

  // Monthly advice
  const monthlyAdvice = [
    { month: "Tháng 1", advice: "Làm sạch và sắp xếp lại góc tài lộc, thêm cây xanh mới" },
    { month: "Tháng 2", advice: "Thay đổi nước trong bể cá hoặc thác nước, thêm đồng tiền mới" },
    { month: "Tháng 3", advice: "Tăng cường ánh sáng trong góc tài lộc, thêm đèn LED" },
    { month: "Tháng 4", advice: "Kiểm tra và thay thế các vật phẩm bị hỏng trong góc tài lộc" },
    { month: "Tháng 5", advice: "Thêm pha lê hoặc đá quý để tăng cường năng lượng tài chính" },
    { month: "Tháng 6", advice: "Sắp xếp lại vị trí các vật phẩm phong thủy theo hướng tốt" },
    { month: "Tháng 7", advice: "Thêm hương thơm tự nhiên để thu hút năng lượng tích cực" },
    { month: "Tháng 8", advice: "Cập nhật và làm mới các biểu tượng tài lộc" },
    { month: "Tháng 9", advice: "Kiểm tra dòng chảy năng lượng, loại bỏ vật cản" },
    { month: "Tháng 10", advice: "Thêm vàng hoặc kim loại quý để tăng cường vận tài" },
    { month: "Tháng 11", advice: "Chuẩn bị cho năm mới bằng cách làm sạch toàn bộ không gian" },
    { month: "Tháng 12", advice: "Đặt mục tiêu tài chính mới và kích hoạt năng lượng cho năm tới" },
  ]

  return {
    personalDirection: personalWealthDir.name,
    personalScore,
    universalCorner: universalWealthDir.name,
    universalScore,
    flyingStarsWealth: flyingStarsDir.name,
    flyingStarsScore,
    overallScore,
    recommendations,
    enhancementObjects: [...personalWealthDir.enhancementObjects, ...universalWealthDir.enhancementObjects].slice(0, 8),
    colors: [...personalWealthDir.colors, ...universalWealthDir.colors].slice(0, 6),
    monthlyAdvice,
  }
}
