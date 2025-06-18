import type { UserSession } from "@/lib/session/sessionOptions" // Đảm bảo đường dẫn chính xác

// Định nghĩa các type cho kết quả bóc mệnh
export interface DestinyData {
  personalityTraits: string[]
  careerPath?: string
  loveLife?: string
  luckyNumbers?: number[]
  luckyColors?: string[]
  challenges?: string
  advice?: string
  // Thêm các trường khác nếu cần
}

export interface DestinyResult {
  success: boolean
  isLimited: boolean
  data: DestinyData | { preview?: string; personalityTraits?: string[] } // Điều chỉnh dựa trên cấu trúc giới hạn thực tế
  error?: string
  element?: string // Ví dụ: 'Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'
  summary?: { mệnh?: string } // Ví dụ
}

// Hàm này mô phỏng logic cốt lõi của API bóc mệnh của bạn
// Trong ứng dụng thực tế, đây sẽ là thuật toán tính toán vận mệnh của bạn
export async function calculateDestiny(
  name: string,
  birthDate: string,
  birthTime?: string,
  session?: UserSession, // Truyền session nếu cần cho logic khách/premium
): Promise<DestinyResult> {
  const isGuest = !session?.isLoggedIn
  const isPremium = session?.isPremium || false

  // Mô phỏng đọc vận mệnh (thay thế bằng AI/thuật toán thực)
  const fullDestinyReading: DestinyData = {
    personalityTraits: [
      `Tính cách mạnh mẽ và quyết đoán cho ${name}, sinh ngày ${birthDate}${birthTime ? `, lúc ${birthTime}` : ""}.`,
      "Có khả năng lãnh đạo tự nhiên và tầm nhìn xa trông rộng.",
      "Luôn đặt mục tiêu cao và nỗ lực không ngừng để đạt được chúng.",
      "Là người có trực giác tốt và khả năng phân tích sắc bén.",
    ],
    careerPath:
      "Phù hợp với các công việc đòi hỏi sự sáng tạo, quản lý hoặc tự kinh doanh. Có tiềm năng thành công lớn nếu kiên trì theo đuổi đam mê.",
    loveLife:
      "Trong tình yêu, bạn là người chung thủy, nồng nhiệt và luôn biết cách vun đắp mối quan hệ. Đôi khi cần tiết chế sự kiểm soát.",
    luckyNumbers: [3, 7, 12, 22, 30],
    luckyColors: ["Xanh lá cây", "Vàng kim", "Nâu đất"],
    challenges:
      "Cần học cách kiên nhẫn hơn và lắng nghe ý kiến đóng góp từ người khác. Tránh đưa ra quyết định vội vàng khi cảm xúc không ổn định.",
    advice:
      "Hãy luôn tin tưởng vào bản thân và những giá trị cốt lõi của mình. Đừng ngại đối mặt với thử thách, vì đó là cơ hội để bạn trưởng thành.",
  }

  // Xác định ngũ hành dựa trên ngày sinh (logic placeholder)
  let element = "Không xác định"
  let menhSummary = "Chưa xác định"
  try {
    const year = new Date(birthDate).getFullYear()
    const lastDigitOfYear = year % 10
    const canChiIndex = year % 60 // Để xác định Can Chi cụ thể hơn nếu cần

    // Logic Ngũ Hành Nạp Âm đơn giản hóa (cần logic chính xác hơn)
    if ([0, 1].includes(lastDigitOfYear)) {
      element = "Kim"
      menhSummary = "Mệnh Kim"
    } else if ([2, 3].includes(lastDigitOfYear)) {
      element = "Thủy"
      menhSummary = "Mệnh Thủy"
    } else if ([4, 5].includes(lastDigitOfYear)) {
      element = "Mộc"
      menhSummary = "Mệnh Mộc"
    } else if ([6, 7].includes(lastDigitOfYear)) {
      element = "Hỏa"
      menhSummary = "Mệnh Hỏa"
    } else if ([8, 9].includes(lastDigitOfYear)) {
      element = "Thổ"
      menhSummary = "Mệnh Thổ"
    }
  } catch (e) {
    console.error("Error parsing birthDate for element calculation:", e)
    // Giữ giá trị mặc định nếu ngày sinh không hợp lệ
  }

  if (isGuest) {
    return {
      success: true,
      isLimited: true,
      data: {
        personalityTraits: fullDestinyReading.personalityTraits.slice(0, 1),
        preview: "Bạn là khách. Đăng ký tài khoản để xem đầy đủ kết quả bóc mệnh của bạn...",
      },
      element,
      summary: { mệnh: `${menhSummary} (Khách)` },
    }
  } else if (!isPremium) {
    return {
      success: true,
      isLimited: true,
      data: {
        ...fullDestinyReading,
        personalityTraits: fullDestinyReading.personalityTraits.slice(0, 2),
        careerPath: fullDestinyReading.careerPath?.substring(0, 100) + "...",
        preview: "Tài khoản thường. Nâng cấp Premium để xem phân tích chi tiết và đầy đủ hơn...",
      },
      element,
      summary: { mệnh: `${menhSummary} (Thường)` },
    }
  } else {
    return {
      success: true,
      isLimited: false,
      data: fullDestinyReading,
      element,
      summary: { mệnh: `${menhSummary} (Premium)` },
    }
  }
}
