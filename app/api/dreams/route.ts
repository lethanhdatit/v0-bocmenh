import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { decryptData, encryptData } from "@/lib/encryption"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { dreamDescription, dreamDate, emotions, dreamType } = decryptData(encrypted)

    const session = await getSession()
    const isGuest = !session.isLoggedIn
    const isPremium = session.isPremium || false

    // Simulate AI-powered dream analysis (replace with real AI/algorithm)
    const dreamAnalysis = {
      overallMeaning: "Giấc mơ này phản ánh những mong muốn sâu thẳm và lo lắng trong tiềm thức của bạn.",
      symbols: [
        {
          symbol: "Nước",
          meaning: "Biểu tượng của cảm xúc và sự thanh tẩy tâm hồn",
          significance: "Cao",
        },
        {
          symbol: "Bay lượn",
          meaning: "Khát vọng tự do và vượt qua giới hạn",
          significance: "Trung bình",
        },
        {
          symbol: "Người thân",
          meaning: "Mối quan hệ và sự kết nối trong cuộc sống",
          significance: "Cao",
        },
      ],
      emotionalAnalysis: {
        primaryEmotion: "Hồi hộp, lo lắng",
        emotionalState: "Bạn đang trải qua giai đoạn chuyển đổi trong cuộc sống",
        advice: "Hãy tin tưởng vào bản thân và đón nhận những thay đổi tích cực",
      },
      predictions: [
        "Một cơ hội mới sẽ xuất hiện trong tuần tới",
        "Mối quan hệ với người thân sẽ được cải thiện",
        "Cần chú ý đến sức khỏe tinh thần của bản thân",
      ],
      recommendations: [
        "Thực hành thiền định để bình tĩnh tâm trí",
        "Ghi chép giấc mơ thường xuyên để hiểu rõ hơn về bản thân",
        "Dành thời gian cho những hoạt động yêu thích",
      ],
      luckyElements: {
        colors: ["Xanh dương", "Trắng", "Bạc"],
        numbers: [3, 7, 12],
        direction: "Hướng Đông",
        timeOfDay: "Buổi sáng sớm",
      },
      spiritualMessage:
        "Giấc mơ này là lời nhắc nhở từ vũ trụ rằng bạn đang trên đúng con đường. Hãy lắng nghe trực giác và tin tưởng vào hành trình của mình.",
    }

    // Limit results for guests
    let responseData
    if (isGuest) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          overallMeaning: dreamAnalysis.overallMeaning,
          symbols: dreamAnalysis.symbols.slice(0, 1),
          emotionalAnalysis: {
            primaryEmotion: dreamAnalysis.emotionalAnalysis.primaryEmotion,
            preview: "Đăng ký để xem phân tích cảm xúc chi tiết...",
          },
          preview: "Đăng ký để xem đầy đủ giải mơ và lời khuyên từ chuyên gia...",
        },
      }
    } else if (!isPremium) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          ...dreamAnalysis,
          symbols: dreamAnalysis.symbols.slice(0, 2),
          predictions: dreamAnalysis.predictions.slice(0, 1),
          recommendations: dreamAnalysis.recommendations.slice(0, 2),
          preview: "Nâng cấp Premium để xem phân tích tâm linh sâu sắc và dự đoán chi tiết...",
        },
      }
    } else {
      responseData = {
        success: true,
        isLimited: false,
        data: dreamAnalysis,
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
