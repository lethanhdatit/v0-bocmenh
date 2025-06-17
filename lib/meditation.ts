export interface MeditationGuide {
  id: string
  name: string
  nameVi: string
  type: "mindfulness" | "chakra" | "loving-kindness" | "body-scan" | "breathing" | "visualization"
  duration: number // in minutes
  difficulty: "beginner" | "intermediate" | "advanced"
  description: string
  descriptionVi: string
  benefits: string[]
  benefitsVi: string[]
  instructions: string[]
  instructionsVi: string[]
  audioUrl?: string
  imageUrl: string
  chakra?: string
  chakraVi?: string
  bestTime: string[]
  bestTimeVi: string[]
}

export const meditationGuides: MeditationGuide[] = [
  {
    id: "mindful-breathing",
    name: "Mindful Breathing",
    nameVi: "Thiền Hơi Thở Chánh Niệm",
    type: "breathing",
    duration: 10,
    difficulty: "beginner",
    description: "A simple yet powerful meditation focusing on breath awareness to calm the mind and reduce stress.",
    descriptionVi:
      "Một phương pháp thiền đơn giản nhưng mạnh mẽ tập trung vào nhận thức hơi thở để làm dịu tâm trí và giảm căng thẳng.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus and concentration",
      "Promotes emotional balance",
      "Enhances self-awareness",
    ],
    benefitsVi: [
      "Giảm căng thẳng và lo âu",
      "Cải thiện sự tập trung",
      "Thúc đẩy cân bằng cảm xúc",
      "Tăng cường nhận thức bản thân",
    ],
    instructions: [
      "Find a comfortable seated position",
      "Close your eyes gently",
      "Focus on your natural breath",
      "When mind wanders, gently return to breath",
      "Continue for the full duration",
    ],
    instructionsVi: [
      "Tìm một tư thế ngồi thoải mái",
      "Nhắm mắt nhẹ nhàng",
      "Tập trung vào hơi thở tự nhiên",
      "Khi tâm trí lang thang, nhẹ nhàng trở về hơi thở",
      "Tiếp tục trong suốt thời gian thiền",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    bestTime: ["Morning", "Before sleep", "During stress"],
    bestTimeVi: ["Buổi sáng", "Trước khi ngủ", "Khi căng thẳng"],
  },
  {
    id: "chakra-balancing",
    name: "Chakra Balancing Meditation",
    nameVi: "Thiền Cân Bằng Chakra",
    type: "chakra",
    duration: 20,
    difficulty: "intermediate",
    description: "A guided meditation to balance and align your seven chakras for optimal energy flow.",
    descriptionVi: "Một buổi thiền hướng dẫn để cân bằng và sắp xếp bảy chakra của bạn để dòng năng lượng tối ưu.",
    benefits: [
      "Balances energy centers",
      "Improves physical vitality",
      "Enhances spiritual connection",
      "Promotes emotional healing",
    ],
    benefitsVi: [
      "Cân bằng các trung tâm năng lượng",
      "Cải thiện sức sống thể chất",
      "Tăng cường kết nối tâm linh",
      "Thúc đẩy chữa lành cảm xúc",
    ],
    instructions: [
      "Lie down comfortably",
      "Visualize each chakra as a spinning wheel of light",
      "Start from root chakra, move upward",
      "Breathe into each energy center",
      "End with full-body light visualization",
    ],
    instructionsVi: [
      "Nằm xuống thoải mái",
      "Hình dung mỗi chakra như một bánh xe ánh sáng quay",
      "Bắt đầu từ chakra gốc, di chuyển lên trên",
      "Thở vào mỗi trung tâm năng lượng",
      "Kết thúc bằng hình dung ánh sáng toàn thân",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    chakra: "All Chakras",
    chakraVi: "Tất cả Chakra",
    bestTime: ["Evening", "During energy work"],
    bestTimeVi: ["Buổi tối", "Khi làm việc với năng lượng"],
  },
  {
    id: "loving-kindness",
    name: "Loving-Kindness Meditation",
    nameVi: "Thiền Từ Bi",
    type: "loving-kindness",
    duration: 15,
    difficulty: "beginner",
    description: "Cultivate compassion and love for yourself and others through this heart-opening practice.",
    descriptionVi: "Nuôi dưỡng lòng từ bi và tình yêu cho bản thân và người khác thông qua thực hành mở lòng này.",
    benefits: [
      "Increases compassion and empathy",
      "Reduces negative emotions",
      "Improves relationships",
      "Enhances emotional well-being",
    ],
    benefitsVi: [
      "Tăng lòng từ bi và đồng cảm",
      "Giảm cảm xúc tiêu cực",
      "Cải thiện các mối quan hệ",
      "Tăng cường sức khỏe cảm xúc",
    ],
    instructions: [
      "Sit comfortably with eyes closed",
      "Start by sending love to yourself",
      "Extend love to loved ones",
      "Include neutral people",
      "Finally, send love to difficult people",
    ],
    instructionsVi: [
      "Ngồi thoải mái với mắt nhắm",
      "Bắt đầu bằng cách gửi tình yêu cho chính mình",
      "Mở rộng tình yêu đến những người thân yêu",
      "Bao gồm những người trung tính",
      "Cuối cùng, gửi tình yêu đến những người khó khăn",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    bestTime: ["Morning", "After conflicts", "Before social interactions"],
    bestTimeVi: ["Buổi sáng", "Sau xung đột", "Trước tương tác xã hội"],
  },
  {
    id: "body-scan",
    name: "Body Scan Meditation",
    nameVi: "Thiền Quét Cơ Thể",
    type: "body-scan",
    duration: 25,
    difficulty: "beginner",
    description: "A systematic practice of bringing awareness to different parts of your body for deep relaxation.",
    descriptionVi: "Một thực hành có hệ thống mang lại nhận thức cho các bộ phận khác nhau của cơ thể để thư giãn sâu.",
    benefits: [
      "Promotes deep relaxation",
      "Increases body awareness",
      "Reduces physical tension",
      "Improves sleep quality",
    ],
    benefitsVi: [
      "Thúc đẩy thư giãn sâu",
      "Tăng nhận thức cơ thể",
      "Giảm căng thẳng thể chất",
      "Cải thiện chất lượng giấc ngủ",
    ],
    instructions: [
      "Lie down in a comfortable position",
      "Start with your toes",
      "Slowly move attention up your body",
      "Notice sensations without judgment",
      "End with whole-body awareness",
    ],
    instructionsVi: [
      "Nằm xuống ở tư thế thoải mái",
      "Bắt đầu với ngón chân",
      "Từ từ di chuyển sự chú ý lên cơ thể",
      "Chú ý cảm giác mà không phán xét",
      "Kết thúc với nhận thức toàn thân",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    bestTime: ["Before sleep", "After exercise", "During stress"],
    bestTimeVi: ["Trước khi ngủ", "Sau tập thể dục", "Khi căng thẳng"],
  },
  {
    id: "visualization",
    name: "Guided Visualization",
    nameVi: "Thiền Hình Dung Hướng Dẫn",
    type: "visualization",
    duration: 18,
    difficulty: "intermediate",
    description: "Use the power of imagination to create positive mental images and manifest your goals.",
    descriptionVi:
      "Sử dụng sức mạnh của trí tưởng tượng để tạo ra những hình ảnh tích cực trong tâm trí và hiện thực hóa mục tiêu.",
    benefits: [
      "Enhances creativity and imagination",
      "Supports goal manifestation",
      "Reduces anxiety about future",
      "Improves mental clarity",
    ],
    benefitsVi: [
      "Tăng cường sáng tạo và trí tưởng tượng",
      "Hỗ trợ hiện thực hóa mục tiêu",
      "Giảm lo lắng về tương lai",
      "Cải thiện sự rõ ràng tinh thần",
    ],
    instructions: [
      "Find a quiet, comfortable space",
      "Close eyes and relax deeply",
      "Visualize your peaceful sanctuary",
      "Engage all your senses",
      "Stay present in the visualization",
    ],
    instructionsVi: [
      "Tìm một không gian yên tĩnh, thoải mái",
      "Nhắm mắt và thư giãn sâu",
      "Hình dung nơi trú ẩn yên bình của bạn",
      "Sử dụng tất cả các giác quan",
      "Ở lại hiện tại trong hình dung",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    bestTime: ["Morning", "Before important events", "During goal setting"],
    bestTimeVi: ["Buổi sáng", "Trước sự kiện quan trọng", "Khi đặt mục tiêu"],
  },
  {
    id: "mindfulness",
    name: "Mindfulness Meditation",
    nameVi: "Thiền Chánh Niệm",
    type: "mindfulness",
    duration: 12,
    difficulty: "beginner",
    description:
      "Develop present-moment awareness and acceptance through mindful observation of thoughts and feelings.",
    descriptionVi:
      "Phát triển nhận thức hiện tại và sự chấp nhận thông qua quan sát chánh niệm các suy nghĩ và cảm xúc.",
    benefits: [
      "Increases present-moment awareness",
      "Reduces rumination and worry",
      "Improves emotional regulation",
      "Enhances overall well-being",
    ],
    benefitsVi: [
      "Tăng nhận thức hiện tại",
      "Giảm suy nghĩ lặp đi lặp lại và lo lắng",
      "Cải thiện điều chỉnh cảm xúc",
      "Tăng cường sức khỏe tổng thể",
    ],
    instructions: [
      "Sit in a comfortable position",
      "Focus on your breath as an anchor",
      "Notice thoughts and feelings as they arise",
      "Observe without getting caught up",
      "Return to breath when distracted",
    ],
    instructionsVi: [
      "Ngồi ở tư thế thoải mái",
      "Tập trung vào hơi thở như một neo",
      "Chú ý suy nghĩ và cảm xúc khi chúng xuất hiện",
      "Quan sát mà không bị cuốn vào",
      "Trở về hơi thở khi bị phân tâm",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    bestTime: ["Any time", "During daily activities", "When feeling overwhelmed"],
    bestTimeVi: ["Bất cứ lúc nào", "Trong các hoạt động hàng ngày", "Khi cảm thấy choáng ngợp"],
  },
]

export function getMeditationsByType(type: string): MeditationGuide[] {
  return meditationGuides.filter((guide) => guide.type === type)
}

export function getMeditationsByDifficulty(difficulty: string): MeditationGuide[] {
  return meditationGuides.filter((guide) => guide.difficulty === difficulty)
}

export function getMeditationsByDuration(minDuration: number, maxDuration: number): MeditationGuide[] {
  return meditationGuides.filter((guide) => guide.duration >= minDuration && guide.duration <= maxDuration)
}

export function getRecommendedMeditations(
  experience: string,
  availableTime: number,
  goals: string[],
): MeditationGuide[] {
  let filtered = meditationGuides

  // Filter by experience level
  if (experience === "beginner") {
    filtered = filtered.filter((guide) => guide.difficulty === "beginner")
  } else if (experience === "intermediate") {
    filtered = filtered.filter((guide) => guide.difficulty === "beginner" || guide.difficulty === "intermediate")
  }

  // Filter by available time
  filtered = filtered.filter((guide) => guide.duration <= availableTime)

  // Sort by goals relevance
  const goalTypeMap: { [key: string]: string[] } = {
    "stress-relief": ["breathing", "body-scan", "mindfulness"],
    focus: ["mindfulness", "breathing"],
    "emotional-healing": ["loving-kindness", "chakra"],
    "spiritual-growth": ["chakra", "visualization"],
    "better-sleep": ["body-scan", "breathing"],
    "self-love": ["loving-kindness", "chakra"],
  }

  const relevantTypes = goals.flatMap((goal) => goalTypeMap[goal] || [])

  if (relevantTypes.length > 0) {
    filtered.sort((a, b) => {
      const aRelevance = relevantTypes.includes(a.type) ? 1 : 0
      const bRelevance = relevantTypes.includes(b.type) ? 1 : 0
      return bRelevance - aRelevance
    })
  }

  return filtered.slice(0, 3) // Return top 3 recommendations
}
