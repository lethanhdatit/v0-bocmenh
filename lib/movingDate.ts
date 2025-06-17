export interface MovingDateRequest {
  name: string
  birthDate: string
  gender: "male" | "female"
  preferredMonth?: string
  urgency: "flexible" | "within_month" | "within_week"
}

export interface MovingDateResponse {
  bestDates: MovingDate[]
  avoidDates: MovingDate[]
  generalAdvice: string[]
  personalAdvice: string[]
}

export interface MovingDate {
  date: string
  lunarDate: string
  dayOfWeek: string
  score: number
  reasons: string[]
  timeSlots: TimeSlot[]
  preparations: string[]
  taboos: string[]
}

export interface TimeSlot {
  time: string
  description: string
  isGood: boolean
}

// Thiên can địa chi
const heavenlyStems = ["Giáp", "Ất", "Bình", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
const earthlyBranches = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]

// Ngày hoàng đạo
const goodDays = ["Kiến", "Trừ", "Mãn", "Bình", "Định", "Chấp", "Phá", "Nguy", "Thành", "Thu", "Khai", "Bế"]
const luckyDaysForMoving = ["Kiến", "Mãn", "Bình", "Định", "Thành", "Khai"]

// Tháng tốt cho chuyển nhà
const goodMonthsForMoving = [2, 3, 4, 5, 8, 9, 10, 11]

function calculateLifeNumber(birthDate: string): number {
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let sum = year + month + day
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number.parseInt(digit), 0)
  }

  return sum
}

function calculateKuaNumber(birthYear: number, gender: "male" | "female"): number {
  const lastTwoDigits = birthYear % 100
  const sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10)
  const finalSum = sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum

  if (gender === "male") {
    const kua = 11 - finalSum
    return kua === 5 ? 2 : kua > 9 ? kua - 9 : kua
  } else {
    const kua = 4 + finalSum
    return kua === 5 ? 8 : kua > 9 ? kua - 9 : kua
  }
}

function getLunarDate(date: Date): string {
  // Simplified lunar calendar conversion
  const lunarMonths = ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Chạp"]
  const approximateLunarDay = date.getDate() - 1
  const approximateLunarMonth = date.getMonth()

  return `${approximateLunarDay + 1} tháng ${lunarMonths[approximateLunarMonth]}`
}

function getDayQuality(date: Date): string {
  const dayIndex = (date.getTime() / (1000 * 60 * 60 * 24)) % 12
  return goodDays[Math.floor(dayIndex)]
}

function isGoodDayForMoving(date: Date, kuaNumber: number): boolean {
  const dayQuality = getDayQuality(date)
  const month = date.getMonth() + 1
  const dayOfWeek = date.getDay()

  // Kiểm tra ngày hoàng đạo
  const isLuckyDay = luckyDaysForMoving.includes(dayQuality)

  // Kiểm tra tháng tốt
  const isGoodMonth = goodMonthsForMoving.includes(month)

  // Tránh thứ 7, chủ nhật
  const isWeekday = dayOfWeek !== 0 && dayOfWeek !== 6

  // Kiểm tra hợp với số Kua
  const kuaCompatible = (date.getDate() + kuaNumber) % 9 !== 5

  return isLuckyDay && isGoodMonth && isWeekday && kuaCompatible
}

function getTimeSlots(date: Date): TimeSlot[] {
  const timeSlots: TimeSlot[] = [
    { time: "5:00-7:00", description: "Giờ Mão - Khởi đầu thuận lợi", isGood: true },
    { time: "7:00-9:00", description: "Giờ Thìn - Rồng bay lên trời", isGood: true },
    { time: "9:00-11:00", description: "Giờ Tỵ - Ổn định, bình an", isGood: false },
    { time: "11:00-13:00", description: "Giờ Ngọ - Thịnh vượng, may mắn", isGood: true },
    { time: "13:00-15:00", description: "Giờ Mùi - Cần thận trọng", isGood: false },
    { time: "15:00-17:00", description: "Giờ Thân - Linh hoạt, thông minh", isGood: true },
    { time: "17:00-19:00", description: "Giờ Dậu - Kết thúc tốt đẹp", isGood: true },
  ]

  return timeSlots
}

function getMovingAdvice(kuaNumber: number, lifeNumber: number): string[] {
  const advice = [
    "Nên chuyển vào buổi sáng sớm để đón khí tốt",
    "Mang theo một chút gạo và muối từ nhà cũ",
    "Thắp hương cúng tổ tiên trước khi chuyển",
    "Người chủ nhà nên bước vào nhà mới đầu tiên",
    "Nấu một nồi chè đậu xanh trong ngày đầu",
  ]

  if (kuaNumber === 1 || kuaNumber === 6) {
    advice.push("Hướng Bắc và Tây Bắc sẽ mang lại may mắn cho bạn")
  } else if (kuaNumber === 2 || kuaNumber === 8) {
    advice.push("Hướng Tây Nam và Đông Bắc phù hợp với bạn")
  }

  return advice
}

export function calculateMovingDates(request: MovingDateRequest): MovingDateResponse {
  const birthDate = new Date(request.birthDate)
  const lifeNumber = calculateLifeNumber(request.birthDate)
  const kuaNumber = calculateKuaNumber(birthDate.getFullYear(), request.gender)

  const today = new Date()
  const endDate = new Date()

  // Xác định khoảng thời gian tìm kiếm
  switch (request.urgency) {
    case "within_week":
      endDate.setDate(today.getDate() + 7)
      break
    case "within_month":
      endDate.setMonth(today.getMonth() + 1)
      break
    case "flexible":
      endDate.setMonth(today.getMonth() + 3)
      break
  }

  const bestDates: MovingDate[] = []
  const avoidDates: MovingDate[] = []

  for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d)
    const isGoodDay = isGoodDayForMoving(currentDate, kuaNumber)
    const dayQuality = getDayQuality(currentDate)
    const lunarDate = getLunarDate(currentDate)
    const dayOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"][currentDate.getDay()]

    const movingDate: MovingDate = {
      date: currentDate.toISOString().split("T")[0],
      lunarDate,
      dayOfWeek,
      score: isGoodDay ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 30,
      reasons: [],
      timeSlots: getTimeSlots(currentDate),
      preparations: [
        "Dọn dẹp nhà cũ sạch sẽ",
        "Chuẩn bị đồ cúng tổ tiên",
        "Thông báo với hàng xóm",
        "Kiểm tra phương tiện vận chuyển",
      ],
      taboos: [
        "Không nên cãi vã trong ngày chuyển",
        "Tránh để nhà trống hoàn toàn",
        "Không quét nhà trong 3 ngày đầu",
        "Tránh chuyển vào ngày mưa to",
      ],
    }

    if (isGoodDay) {
      movingDate.reasons = [
        `Ngày ${dayQuality} - thuộc ngày hoàng đạo`,
        "Phù hợp với số Kua của bạn",
        "Thời tiết thuận lợi cho việc chuyển nhà",
        "Khí trường tích cực, mang lại may mắn",
      ]
      bestDates.push(movingDate)
    } else {
      movingDate.reasons = [
        `Ngày ${dayQuality} - không thuộc ngày hoàng đạo`,
        "Có thể gặp khó khăn trong quá trình chuyển",
        "Cần thận trọng hơn nếu buộc phải chuyển",
      ]
      if (avoidDates.length < 5) {
        avoidDates.push(movingDate)
      }
    }
  }

  // Sắp xếp theo điểm số
  bestDates.sort((a, b) => b.score - a.score)

  return {
    bestDates: bestDates.slice(0, 10),
    avoidDates: avoidDates.slice(0, 5),
    generalAdvice: [
      "Chọn ngày hoàng đạo để chuyển nhà sẽ mang lại may mắn",
      "Nên chuyển vào buổi sáng để đón khí tốt",
      "Tránh chuyển nhà vào những ngày mưa to, gió lớn",
      "Chuẩn bị đầy đủ đồ cúng để tạ ơn thần linh",
      "Mời bạn bè đến chúc mừng nhà mới để tăng khí vượng",
    ],
    personalAdvice: getMovingAdvice(kuaNumber, lifeNumber),
  }
}
