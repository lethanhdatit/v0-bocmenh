import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session/session"
import { decryptData, encryptData } from "@/lib/infra/encryption"

// Tarot card database
const tarotCards = [
  {
    id: 1,
    name: "The Fool",
    nameVi: "Kẻ Ngốc",
    suit: "Major Arcana",
    image: "/placeholder.svg?height=400&width=280",
    upright: {
      keywords: ["Khởi đầu mới", "Tự do", "Phiêu lưu", "Tiềm năng"],
      meaning: "Bạn đang đứng trước một khởi đầu mới đầy hứa hẹn. Hãy tin tưởng vào bản thân và dũng cảm bước đi.",
    },
    reversed: {
      keywords: ["Liều lĩnh", "Thiếu kế hoạch", "Sợ hãi", "Chậm trễ"],
      meaning: "Bạn có thể đang do dự hoặc hành động thiếu suy nghĩ. Hãy cân nhắc kỹ trước khi quyết định.",
    },
  },
  {
    id: 2,
    name: "The Magician",
    nameVi: "Pháp Sư",
    suit: "Major Arcana",
    image: "/placeholder.svg?height=400&width=280",
    upright: {
      keywords: ["Sức mạnh", "Kỹ năng", "Tập trung", "Hành động"],
      meaning: "Bạn có đủ khả năng và nguồn lực để đạt được mục tiêu. Đây là lúc hành động.",
    },
    reversed: {
      keywords: ["Lạm dụng quyền lực", "Thiếu tập trung", "Trì hoãn"],
      meaning: "Bạn có thể đang lãng phí tài năng hoặc sử dụng sai cách năng lực của mình.",
    },
  },
  {
    id: 3,
    name: "The High Priestess",
    nameVi: "Nữ Tế",
    suit: "Major Arcana",
    image: "/placeholder.svg?height=400&width=280",
    upright: {
      keywords: ["Trực giác", "Bí ẩn", "Tiềm thức", "Nữ tính"],
      meaning: "Hãy lắng nghe tiếng nói bên trong và tin tưởng vào trực giác của bạn.",
    },
    reversed: {
      keywords: ["Bí mật", "Thiếu trực giác", "Rút lui"],
      meaning: "Bạn có thể đang bỏ qua những dấu hiệu quan trọng hoặc che giấu sự thật.",
    },
  },
  {
    id: 4,
    name: "The Empress",
    nameVi: "Hoàng Hậu",
    suit: "Major Arcana",
    image: "/placeholder.svg?height=400&width=280",
    upright: {
      keywords: ["Sáng tạo", "Sinh sản", "Nuôi dưỡng", "Tự nhiên"],
      meaning: "Thời kỳ thịnh vượng và sáng tạo đang đến. Hãy nuôi dưỡng những ý tưởng của bạn.",
    },
    reversed: {
      keywords: ["Sáng tạo bị cản trở", "Phụ thuộc", "Thiếu tự tin"],
      meaning: "Bạn có thể đang gặp khó khăn trong việc thể hiện bản thân hoặc quá phụ thuộc vào người khác.",
    },
  },
  {
    id: 5,
    name: "The Emperor",
    nameVi: "Hoàng Đế",
    suit: "Major Arcana",
    image: "/placeholder.svg?height=400&width=280",
    upright: {
      keywords: ["Quyền lực", "Cấu trúc", "Kiểm soát", "Lãnh đạo"],
      meaning: "Bạn cần thể hiện sự lãnh đạo và tạo ra trật tự trong cuộc sống.",
    },
    reversed: {
      keywords: ["Độc tài", "Thiếu kỷ luật", "Lạm quyền"],
      meaning: "Bạn có thể đang quá khắt khe với bản thân hoặc người khác, hoặc thiếu kỷ luật.",
    },
  },
  {
    id: 6,
    name: "The Lovers",
    nameVi: "Đôi Tình Nhân",
    suit: "Major Arcana",
    image: "/placeholder.svg?height=400&width=280",
    upright: {
      keywords: ["Tình yêu", "Hòa hợp", "Lựa chọn", "Kết nối"],
      meaning: "Tình yêu và sự hòa hợp đang đến với bạn. Đây cũng là lúc đưa ra những lựa chọn quan trọng.",
    },
    reversed: {
      keywords: ["Bất hòa", "Lựa chọn sai", "Mất cân bằng"],
      meaning: "Mối quan hệ có thể gặp khó khăn hoặc bạn đang đưa ra những quyết định không phù hợp.",
    },
  },
]

const spreadTypes = [
  {
    id: "single",
    name: "Một Lá Bài",
    nameEn: "Single Card",
    description: "Câu trả lời nhanh cho câu hỏi của bạn",
    cardCount: 1,
  },
  {
    id: "three-card",
    name: "Ba Lá Bài",
    nameEn: "Three Card Spread",
    description: "Quá khứ - Hiện tại - Tương lai",
    cardCount: 3,
  },
  {
    id: "love",
    name: "Tình Yêu",
    nameEn: "Love Spread",
    description: "Tình hình tình cảm và mối quan hệ",
    cardCount: 3,
  },
  {
    id: "career",
    name: "Sự Nghiệp",
    nameEn: "Career Spread",
    description: "Con đường sự nghiệp và tài chính",
    cardCount: 3,
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { question, spreadType, selectedCards } = decryptData(encrypted)

    const session = await getSession()
    const isGuest = !session.isLoggedIn
    const isPremium = session.isPremium || false

    // Get the selected spread
    const spread = spreadTypes.find((s) => s.id === spreadType) || spreadTypes[0]

    // Generate random cards if not provided
    const cardIds = selectedCards || []
    while (cardIds.length < spread.cardCount) {
      const randomId = Math.floor(Math.random() * tarotCards.length) + 1
      if (!cardIds.includes(randomId)) {
        cardIds.push(randomId)
      }
    }

    // Get the cards and determine if they're reversed
    const drawnCards = cardIds.slice(0, spread.cardCount).map((id: number, index: number) => {
      const card = tarotCards.find((c) => c.id === id) || tarotCards[0]
      const isReversed = Math.random() < 0.3 // 30% chance of reversed
      const interpretation = isReversed ? card.reversed : card.upright

      return {
        ...card,
        position: index,
        isReversed,
        interpretation,
        positionMeaning: getPositionMeaning(spreadType, index),
      }
    })

    // Generate overall reading
    const overallReading = generateOverallReading(drawnCards, spreadType, question)

    // Limit results for guests
    let responseData
    if (isGuest) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          spread,
          cards: drawnCards.map((card) => ({
            ...card,
            interpretation: {
              keywords: card.interpretation.keywords.slice(0, 2),
              meaning: card.interpretation.meaning.substring(0, 100) + "...",
            },
          })),
          overallReading: overallReading.substring(0, 200) + "...",
          preview: "Đăng ký để xem đầy đủ giải thích chi tiết và lời khuyên từ các lá bài Tarot...",
        },
      }
    } else if (!isPremium) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          spread,
          cards: drawnCards,
          overallReading,
          preview: "Nâng cấp Premium để nhận thêm lời khuyên chi tiết và dự đoán tương lai...",
        },
      }
    } else {
      responseData = {
        success: true,
        isLimited: false,
        data: {
          spread,
          cards: drawnCards,
          overallReading,
          advice: generateAdvice(drawnCards),
          luckyPeriod: generateLuckyPeriod(),
        },
      }
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    const errorData = {
      success: false,
      error: "Internal server error",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}

function getPositionMeaning(spreadType: string, position: number): string {
  const meanings: Record<string, string[]> = {
    single: ["Câu trả lời"],
    "three-card": ["Quá khứ", "Hiện tại", "Tương lai"],
    love: ["Tình cảm hiện tại", "Thách thức", "Kết quả"],
    career: ["Tình hình hiện tại", "Cơ hội", "Lời khuyên"],
  }

  return meanings[spreadType]?.[position] || "Vị trí " + (position + 1)
}

function generateOverallReading(cards: any[], spreadType: string, question: string): string {
  const readings = [
    "Các lá bài cho thấy bạn đang ở một giai đoạn chuyển đổi quan trọng trong cuộc sống. Những thay đổi tích cực đang chờ đợi phía trước.",
    "Năng lượng xung quanh bạn rất mạnh mẽ. Đây là thời điểm tốt để theo đuổi những mục tiêu lớn và thực hiện những kế hoạch quan trọng.",
    "Các lá bài nhắc nhở bạn cần cân bằng giữa lý trí và cảm xúc. Hãy lắng nghe cả trái tim và lý trí khi đưa ra quyết định.",
    "Một chu kỳ mới đang bắt đầu trong cuộc sống của bạn. Hãy sẵn sàng đón nhận những cơ hội và thử thách mới.",
  ]

  return readings[Math.floor(Math.random() * readings.length)]
}

function generateAdvice(cards: any[]): string[] {
  return [
    "Hãy tin tưởng vào trực giác của bản thân trong những quyết định quan trọng",
    "Đây là thời điểm tốt để tập trung vào phát triển bản thân",
    "Cân bằng giữa công việc và cuộc sống cá nhân sẽ mang lại hạnh phúc",
    "Mở lòng với những cơ hội mới và đừng sợ thay đổi",
  ]
}

function generateLuckyPeriod(): { period: string; activities: string[] } {
  const periods = ["Tuần tới", "Tháng này", "3 tháng tới", "Cuối năm"]
  const activities = [
    ["Đầu tư tài chính", "Khởi nghiệp"],
    ["Tình yêu", "Kết hôn"],
    ["Du lịch", "Học tập"],
    ["Chuyển nhà", "Thay đổi công việc"],
  ]

  const randomIndex = Math.floor(Math.random() * periods.length)
  return {
    period: periods[randomIndex],
    activities: activities[randomIndex],
  }
}
