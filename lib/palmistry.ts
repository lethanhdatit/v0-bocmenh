export interface PalmLine {
  name: string
  description: string
  meaning: string
  characteristics: string[]
}

export interface HandType {
  name: string
  description: string
  characteristics: string[]
  personality: string[]
  career: string[]
}

export interface PalmReading {
  handType: HandType
  lines: {
    lifeLine: PalmLine
    heartLine: PalmLine
    headLine: PalmLine
    fateLine: PalmLine
  }
  fingers: {
    thumb: string
    index: string
    middle: string
    ring: string
    pinky: string
  }
  mounts: {
    venus: string
    jupiter: string
    saturn: string
    apollo: string
    mercury: string
    mars: string
    moon: string
  }
  overall: string
  advice: string[]
}

const handTypes: HandType[] = [
  {
    name: "Bàn Tay Đất",
    description: "Bàn tay vuông vắn với ngón tay ngắn",
    characteristics: ["Bàn tay vuông", "Ngón tay ngắn", "Da dày", "Đường rõ nét"],
    personality: ["Thực tế", "Đáng tin cậy", "Kiên nhẫn", "Trung thực"],
    career: ["Xây dựng", "Nông nghiệp", "Thủ công", "Kỹ thuật"],
  },
  {
    name: "Bàn Tay Khí",
    description: "Bàn tay vuông với ngón tay dài",
    characteristics: ["Bàn tay vuông", "Ngón tay dài", "Da mỏng", "Đường phức tạp"],
    personality: ["Giao tiếp tốt", "Sáng tạo", "Thông minh", "Linh hoạt"],
    career: ["Truyền thông", "Giáo dục", "Viết lách", "Tư vấn"],
  },
  {
    name: "Bàn Tay Hỏa",
    description: "Bàn tay dài với ngón tay ngắn",
    characteristics: ["Bàn tay dài", "Ngón tay ngắn", "Da hồng", "Đường sâu"],
    personality: ["Năng động", "Nhiệt huyết", "Lãnh đạo", "Tự tin"],
    career: ["Kinh doanh", "Bán hàng", "Thể thao", "Giải trí"],
  },
  {
    name: "Bàn Tay Thủy",
    description: "Bàn tay dài với ngón tay dài",
    characteristics: ["Bàn tay dài", "Ngón tay dài", "Da mềm", "Đường mờ"],
    personality: ["Nhạy cảm", "Trực giác", "Nghệ thuật", "Cảm xúc"],
    career: ["Nghệ thuật", "Âm nhạc", "Tâm lý học", "Chăm sóc"],
  },
]

const palmLines = {
  lifeLine: [
    {
      name: "Đường Đời Dài",
      description: "Đường đời dài và rõ nét",
      meaning: "Sức khỏe tốt, tuổi thọ cao",
      characteristics: ["Năng lượng dồi dào", "Sức đề kháng tốt", "Lạc quan", "Yêu đời"],
    },
    {
      name: "Đường Đời Ngắn",
      description: "Đường đời ngắn nhưng sâu",
      meaning: "Cường độ sống cao, tập trung",
      characteristics: ["Sống tích cực", "Tập trung mục tiêu", "Hiệu quả", "Quyết đoán"],
    },
    {
      name: "Đường Đời Cong",
      description: "Đường đời cong rộng",
      meaning: "Năng lượng mạnh, nhiệt huyết",
      characteristics: ["Năng động", "Thích phiêu lưu", "Dũng cảm", "Tự tin"],
    },
  ],
  heartLine: [
    {
      name: "Đường Tình Dài",
      description: "Đường tình dài và thẳng",
      meaning: "Tình cảm sâu sắc, chung thủy",
      characteristics: ["Yêu sâu sắc", "Chung thủy", "Lãng mạn", "Quan tâm người khác"],
    },
    {
      name: "Đường Tình Cong",
      description: "Đường tình cong lên trên",
      meaning: "Tình cảm phong phú, biểu đạt tốt",
      characteristics: ["Biểu đạt cảm xúc tốt", "Hòa đồng", "Ấm áp", "Dễ gần"],
    },
    {
      name: "Đường Tình Ngắn",
      description: "Đường tình ngắn và sâu",
      meaning: "Tình cảm tập trung, chọn lọc",
      characteristics: ["Chọn lọc trong tình yêu", "Tập trung", "Thực tế", "Ổn định"],
    },
  ],
  headLine: [
    {
      name: "Đường Trí Thẳng",
      description: "Đường trí thẳng và dài",
      meaning: "Tư duy logic, thực tế",
      characteristics: ["Tư duy logic", "Thực tế", "Tập trung", "Có tổ chức"],
    },
    {
      name: "Đường Trí Cong",
      description: "Đường trí cong xuống",
      meaning: "Tư duy sáng tạo, trực giác",
      characteristics: ["Sáng tạo", "Trực giác tốt", "Nghệ thuật", "Tưởng tượng phong phú"],
    },
    {
      name: "Đường Trí Sâu",
      description: "Đường trí sâu và rõ",
      meaning: "Trí tuệ cao, tập trung tốt",
      characteristics: ["Thông minh", "Tập trung cao", "Phân tích tốt", "Quyết đoán"],
    },
  ],
  fateLine: [
    {
      name: "Đường Vận Mệnh Rõ",
      description: "Đường vận mệnh rõ nét từ cổ tay",
      meaning: "Định hướng rõ ràng, thành công",
      characteristics: ["Mục tiêu rõ ràng", "Thành công sự nghiệp", "Ổn định", "Có định hướng"],
    },
    {
      name: "Đường Vận Mệnh Đứt Quãng",
      description: "Đường vận mệnh có đoạn đứt",
      meaning: "Thay đổi nghề nghiệp, linh hoạt",
      characteristics: ["Linh hoạt", "Thích thay đổi", "Đa tài", "Thích ứng tốt"],
    },
    {
      name: "Đường Vận Mệnh Mờ",
      description: "Đường vận mệnh mờ hoặc không có",
      meaning: "Tự do lựa chọn, không bị ràng buộc",
      characteristics: ["Tự do", "Không thích ràng buộc", "Sáng tạo", "Độc lập"],
    },
  ],
}

export function analyzeHand(hand: string, gender: string, age: number): PalmReading {
  // Determine hand type based on input
  const handTypeIndex = Math.floor(Math.random() * handTypes.length)
  const selectedHandType = handTypes[handTypeIndex]

  // Analyze lines based on age and gender
  const ageGroup = age < 30 ? 0 : age < 50 ? 1 : 2
  const genderModifier = gender === "male" ? 0 : 1

  const lifeLine = palmLines.lifeLine[Math.floor(Math.random() * palmLines.lifeLine.length)]
  const heartLine = palmLines.heartLine[Math.floor(Math.random() * palmLines.heartLine.length)]
  const headLine = palmLines.headLine[Math.floor(Math.random() * palmLines.headLine.length)]
  const fateLine = palmLines.fateLine[Math.floor(Math.random() * palmLines.fateLine.length)]

  // Finger analysis
  const fingerMeanings = {
    thumb: "Ngón cái thể hiện ý chí và quyết tâm. Ngón cái mạnh mẽ cho thấy tính cách mạnh mẽ và khả năng lãnh đạo.",
    index: "Ngón trỏ đại diện cho tham vọng và lãnh đạo. Ngón trỏ dài cho thấy khả năng lãnh đạo tự nhiên.",
    middle: "Ngón giữa thể hiện trách nhiệm và kỷ luật. Ngón giữa cân đối cho thấy tính cách ổn định.",
    ring: "Ngón áp út đại diện cho sáng tạo và nghệ thuật. Ngón áp út dài cho thấy tài năng nghệ thuật.",
    pinky: "Ngón út thể hiện giao tiếp và kinh doanh. Ngón út dài cho thấy khả năng giao tiếp tốt.",
  }

  // Mount analysis
  const mountMeanings = {
    venus: "Gò Venus (dưới ngón cái) thể hiện tình yêu và sức sống. Gò Venus phát triển cho thấy tình cảm phong phú.",
    jupiter:
      "Gò Jupiter (dưới ngón trỏ) đại diện cho tham vọng và lãnh đạo. Gò Jupiter nổi bật cho thấy khả năng lãnh đạo.",
    saturn: "Gò Saturn (dưới ngón giữa) thể hiện trách nhiệm và kỷ luật. Gò Saturn cân đối cho thấy tính cách ổn định.",
    apollo:
      "Gò Apollo (dưới ngón áp út) đại diện cho nghệ thuật và sáng tạo. Gò Apollo phát triển cho thấy tài năng nghệ thuật.",
    mercury:
      "Gò Mercury (dưới ngón út) thể hiện giao tiếp và kinh doanh. Gò Mercury nổi bật cho thấy khả năng kinh doanh.",
    mars: "Gò Mars thể hiện can đảm và năng lượng. Gò Mars phát triển cho thấy tinh thần chiến đấu mạnh mẽ.",
    moon: "Gò Mặt Trăng đại diện cho trực giác và tưởng tượng. Gò Mặt Trăng nổi bật cho thấy trực giác tốt.",
  }

  const overall = `Dựa trên phân tích bàn tay ${hand}, bạn thuộc nhóm ${selectedHandType.name}. ${selectedHandType.description}. Điều này cho thấy bạn có tính cách ${selectedHandType.personality.join(", ").toLowerCase()} và phù hợp với các ngành nghề như ${selectedHandType.career.join(", ").toLowerCase()}.`

  const advice = [
    "Hãy tin tưởng vào trực giác của mình khi đưa ra quyết định quan trọng.",
    "Phát triển những điểm mạnh tự nhiên của bạn để đạt được thành công.",
    "Cân bằng giữa công việc và cuộc sống cá nhân để có hạnh phúc trọn vẹn.",
    "Lắng nghe lời khuyên từ người khác nhưng hãy tự quyết định con đường của mình.",
    "Kiên nhẫn và kiên trì sẽ giúp bạn vượt qua mọi thử thách trong cuộc sống.",
  ]

  return {
    handType: selectedHandType,
    lines: {
      lifeLine,
      heartLine,
      headLine,
      fateLine,
    },
    fingers: fingerMeanings,
    mounts: mountMeanings,
    overall,
    advice,
  }
}
