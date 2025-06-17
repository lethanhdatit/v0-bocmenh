// House Direction analysis utilities

export interface HouseDirectionResult {
  houseDirection: string
  kuaNumber: number
  compatibility: "excellent" | "very-good" | "good" | "fair" | "poor"
  score: number
  analysis: {
    overall: string
    wealth: string
    health: string
    relationships: string
    career: string
  }
  recommendations: {
    colors: string[]
    elements: string[]
    decorations: string[]
    layouts: string[]
    remedies: string[]
  }
  bestRooms: {
    [key: string]: string[]
  }
  avoidRooms: {
    [key: string]: string[]
  }
  monthlyAdvice: {
    [key: string]: string
  }
}

// 8 main directions with their properties
export const houseDirections = {
  north: {
    name: "Bắc",
    element: "Thủy",
    energy: "Yin",
    season: "Đông",
    color: "Đen, Xanh dương",
    number: 1,
    characteristics: ["Sự nghiệp", "Trí tuệ", "Tâm linh"],
  },
  northeast: {
    name: "Đông Bắc",
    element: "Thổ",
    energy: "Yang",
    season: "Cuối đông",
    color: "Vàng, Nâu",
    number: 8,
    characteristics: ["Kiến thức", "Tự tu", "Sự ổn định"],
  },
  east: {
    name: "Đông",
    element: "Mộc",
    energy: "Yang",
    season: "Xuân",
    color: "Xanh lá",
    number: 3,
    characteristics: ["Gia đình", "Sức khỏe", "Khởi đầu mới"],
  },
  southeast: {
    name: "Đông Nam",
    element: "Mộc",
    energy: "Yin",
    season: "Cuối xuân",
    color: "Xanh lá đậm",
    number: 4,
    characteristics: ["Tài lộc", "Thịnh vượng", "Giao tiếp"],
  },
  south: {
    name: "Nam",
    element: "Hỏa",
    energy: "Yang",
    season: "Hè",
    color: "Đỏ, Cam",
    number: 9,
    characteristics: ["Danh tiếng", "Thành công", "Năng lượng"],
  },
  southwest: {
    name: "Tây Nam",
    element: "Thổ",
    energy: "Yin",
    season: "Cuối hè",
    color: "Vàng đất, Nâu",
    number: 2,
    characteristics: ["Tình yêu", "Hôn nhân", "Mối quan hệ"],
  },
  west: {
    name: "Tây",
    element: "Kim",
    energy: "Yin",
    season: "Thu",
    color: "Trắng, Bạc",
    number: 7,
    characteristics: ["Con cái", "Sáng tạo", "Niềm vui"],
  },
  northwest: {
    name: "Tây Bắc",
    element: "Kim",
    energy: "Yang",
    season: "Cuối thu",
    color: "Trắng, Vàng kim",
    number: 6,
    characteristics: ["Lãnh đạo", "Quý nhân", "Uy quyền"],
  },
}

// Kua number compatibility with house directions
export const kuaDirectionCompatibility = {
  1: {
    excellent: ["north", "southeast", "east", "south"],
    poor: ["northeast", "southwest", "west", "northwest"],
  },
  2: {
    excellent: ["northeast", "southwest", "west", "northwest"],
    poor: ["north", "southeast", "east", "south"],
  },
  3: {
    excellent: ["north", "southeast", "east", "south"],
    poor: ["northeast", "southwest", "west", "northwest"],
  },
  4: {
    excellent: ["north", "southeast", "east", "south"],
    poor: ["northeast", "southwest", "west", "northwest"],
  },
  6: {
    excellent: ["northeast", "southwest", "west", "northwest"],
    poor: ["north", "southeast", "east", "south"],
  },
  7: {
    excellent: ["northeast", "southwest", "west", "northwest"],
    poor: ["north", "southeast", "east", "south"],
  },
  8: {
    excellent: ["northeast", "southwest", "west", "northwest"],
    poor: ["north", "southeast", "east", "south"],
  },
  9: {
    excellent: ["north", "southeast", "east", "south"],
    poor: ["northeast", "southwest", "west", "northwest"],
  },
}

// Calculate compatibility score
export function calculateCompatibilityScore(kuaNumber: number, houseDirection: string): number {
  const compatibility = kuaDirectionCompatibility[kuaNumber as keyof typeof kuaDirectionCompatibility]

  if (compatibility.excellent.includes(houseDirection)) {
    return 85 + Math.floor(Math.random() * 15) // 85-100
  } else if (compatibility.poor.includes(houseDirection)) {
    return 20 + Math.floor(Math.random() * 30) // 20-50
  } else {
    return 50 + Math.floor(Math.random() * 25) // 50-75
  }
}

// Get compatibility level from score
export function getCompatibilityLevel(score: number): "excellent" | "very-good" | "good" | "fair" | "poor" {
  if (score >= 90) return "excellent"
  if (score >= 80) return "very-good"
  if (score >= 70) return "good"
  if (score >= 60) return "fair"
  return "poor"
}

// Generate detailed analysis
export function generateHouseAnalysis(
  kuaNumber: number,
  houseDirection: string,
  score: number,
): HouseDirectionResult["analysis"] {
  const direction = houseDirections[houseDirection as keyof typeof houseDirections]
  const compatibility = kuaDirectionCompatibility[kuaNumber as keyof typeof kuaDirectionCompatibility]
  const isGood = compatibility.excellent.includes(houseDirection)

  return {
    overall: isGood
      ? `Hướng nhà ${direction.name} rất phù hợp với số Kua ${kuaNumber} của bạn. Đây là một trong những hướng tốt nhất giúp bạn phát triển toàn diện về mọi mặt cuộc sống.`
      : `Hướng nhà ${direction.name} không hoàn toàn phù hợp với số Kua ${kuaNumber}. Tuy nhiên, bạn có thể cải thiện năng lượng thông qua các biện pháp phong thủy phù hợp.`,

    wealth: isGood
      ? `Hướng ${direction.name} mang lại năng lượng tích cực cho tài chính. Bạn có thể đặt khu vực làm việc hoặc két sắt ở phía ${direction.name} để tăng cường vận tài lộc.`
      : `Cần chú ý đến việc quản lý tài chính khi ở hướng này. Nên đặt cây xanh hoặc đồ vật phong thủy để cải thiện năng lượng tài lộc.`,

    health: isGood
      ? `Sức khỏe được hỗ trợ tốt với hướng nhà này. Năng lượng ${direction.element} giúp cân bằng thể chất và tinh thần.`
      : `Cần chú ý chăm sóc sức khỏe nhiều hơn. Nên bố trí phòng ngủ ở vị trí thuận lợi và sử dụng màu sắc phù hợp để cải thiện năng lượng.`,

    relationships: isGood
      ? `Mối quan hệ gia đình và xã hội phát triển thuận lợi. Hướng ${direction.name} tạo ra không gian hài hòa cho các mối quan hệ.`
      : `Cần chú ý giao tiếp và xây dựng mối quan hệ. Nên bố trí phòng khách ở vị trí trung tâm và sử dụng ánh sáng ấm áp.`,

    career: isGood
      ? `Sự nghiệp phát triển thuận lợi với hướng nhà này. Năng lượng ${direction.name} hỗ trợ tốt cho công việc và thăng tiến.`
      : `Cần nỗ lực nhiều hơn trong công việc. Nên đặt bàn làm việc hướng về phía tốt và sử dụng các vật phẩm phong thủy hỗ trợ sự nghiệp.`,
  }
}

// Generate recommendations
export function generateRecommendations(
  kuaNumber: number,
  houseDirection: string,
): HouseDirectionResult["recommendations"] {
  const direction = houseDirections[houseDirection as keyof typeof houseDirections]
  const compatibility = kuaDirectionCompatibility[kuaNumber as keyof typeof kuaDirectionCompatibility]
  const isGood = compatibility.excellent.includes(houseDirection)

  if (isGood) {
    return {
      colors: direction.color.split(", ").concat(["Trắng", "Kem"]),
      elements: [direction.element, "Các nguyên tố hỗ trợ"],
      decorations: [
        `Tranh ảnh thể hiện năng lượng ${direction.name}`,
        "Cây xanh tươi tốt",
        "Đèn chiếu sáng đầy đủ",
        "Gương đặt đúng vị trí",
      ],
      layouts: [
        `Đặt phòng khách hướng ${direction.name}`,
        "Bố trí nội thất theo nguyên tắc đối xứng",
        "Tạo không gian thoáng đãng",
        "Sắp xếp đồ đạc gọn gàng",
      ],
      remedies: [],
    }
  } else {
    return {
      colors: ["Trắng", "Kem", "Xanh nhạt"],
      elements: ["Kim", "Thủy", "Mộc"],
      decorations: ["Chuông gió kim loại", "Cây xanh lá to", "Đá phong thủy", "Tượng phong thủy"],
      layouts: [
        "Tránh đặt giường ngủ hướng xấu",
        "Bố trí phòng làm việc ở vị trí tốt",
        "Tạo không gian thoáng mát",
        "Sử dụng ánh sáng tự nhiên",
      ],
      remedies: [
        `Treo gương Ba Quái ở hướng ${direction.name}`,
        "Đặt cây xanh lớn để hóa giải",
        "Sử dụng đèn chiếu sáng mạnh",
        "Thường xuyên thông gió",
      ],
    }
  }
}

// Generate room placement advice
export function generateRoomPlacement(
  kuaNumber: number,
  houseDirection: string,
): { bestRooms: { [key: string]: string[] }; avoidRooms: { [key: string]: string[] } } {
  const compatibility = kuaDirectionCompatibility[kuaNumber as keyof typeof kuaDirectionCompatibility]
  const isGood = compatibility.excellent.includes(houseDirection)

  if (isGood) {
    return {
      bestRooms: {
        "Phòng ngủ chính": ["Đặt ở vị trí trung tâm hoặc hướng tốt", "Giường ngủ hướng về phía may mắn"],
        "Phòng làm việc": ["Đặt gần cửa chính", "Bàn làm việc hướng ra cửa"],
        "Phòng khách": ["Đặt ở trung tâm nhà", "Bố trí ghế sofa hướng vào trong"],
        "Nhà bếp": ["Đặt ở phía sau nhà", "Bếp hướng về phía tốt"],
      },
      avoidRooms: {
        "Nhà vệ sinh": ["Không đặt ở trung tâm", "Tránh hướng về cửa chính"],
        "Kho chứa": ["Đặt ở góc nhà", "Tránh các hướng quan trọng"],
      },
    }
  } else {
    return {
      bestRooms: {
        "Phòng ngủ chính": ["Đặt ở hướng tốt nhất có thể", "Sử dụng màn che để hóa giải"],
        "Phòng làm việc": ["Đặt ở vị trí có ánh sáng tốt", "Sử dụng cây xanh để cải thiện năng lượng"],
      },
      avoidRooms: {
        "Phòng ngủ": [`Tránh đặt ở hướng ${houseDirection}`, "Không để giường hướng ra cửa"],
        "Phòng làm việc": ["Tránh đặt bàn làm việc hướng xấu", "Không để lưng quay về cửa"],
        "Nhà bếp": ["Tránh bếp hướng về phía xấu", "Không đặt gần nhà vệ sinh"],
      },
    }
  }
}

// Generate monthly advice
export function generateMonthlyAdvice(): { [key: string]: string } {
  return {
    "Tháng 1": "Tập trung vào việc dọn dẹp và sắp xếp lại không gian sống",
    "Tháng 2": "Thời điểm tốt để thay đổi bố cục nội thất",
    "Tháng 3": "Nên trồng cây xanh và trang trí hoa tươi",
    "Tháng 4": "Tăng cường ánh sáng tự nhiên trong nhà",
    "Tháng 5": "Thời điểm tốt để sửa chữa và cải tạo",
    "Tháng 6": "Chú ý đến việc thông gió và làm mát",
    "Tháng 7": "Nên sử dụng màu sắc tươi sáng trong trang trí",
    "Tháng 8": "Thời điểm tốt để đầu tư vào nội thất mới",
    "Tháng 9": "Tập trung vào việc tạo không gian học tập",
    "Tháng 10": "Chuẩn bị cho mùa đông bằng cách thay đổi màu sắc",
    "Tháng 11": "Tăng cường ánh sáng ấm áp trong nhà",
    "Tháng 12": "Thời điểm tốt để tổng kết và lập kế hoạch năm mới",
  }
}

// Main analysis function
export function analyzeHouseDirection(kuaNumber: number, houseDirection: string): HouseDirectionResult {
  const score = calculateCompatibilityScore(kuaNumber, houseDirection)
  const compatibility = getCompatibilityLevel(score)
  const analysis = generateHouseAnalysis(kuaNumber, houseDirection, score)
  const recommendations = generateRecommendations(kuaNumber, houseDirection)
  const { bestRooms, avoidRooms } = generateRoomPlacement(kuaNumber, houseDirection)
  const monthlyAdvice = generateMonthlyAdvice()

  return {
    houseDirection,
    kuaNumber,
    compatibility,
    score,
    analysis,
    recommendations,
    bestRooms,
    avoidRooms,
    monthlyAdvice,
  }
}

// Get direction name in Vietnamese
export function getDirectionName(direction: string): string {
  return houseDirections[direction as keyof typeof houseDirections]?.name || direction
}

// Get all directions for selection
export function getAllDirections() {
  return Object.entries(houseDirections).map(([key, value]) => ({
    value: key,
    label: value.name,
    element: value.element,
    characteristics: value.characteristics,
  }))
}
