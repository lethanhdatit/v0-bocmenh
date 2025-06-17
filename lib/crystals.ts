export interface Crystal {
  id: string
  name: string
  nameVi: string
  color: string
  chakra: string
  element: string
  properties: string[]
  propertiesVi: string[]
  healingBenefits: string[]
  healingBenefitsVi: string[]
  zodiacSigns: string[]
  cleansing: string[]
  cleansingVi: string[]
  meditation: string
  meditationVi: string
  placement: string
  placementVi: string
  image: string
}

export const crystalsDatabase: Crystal[] = [
  {
    id: "amethyst",
    name: "Amethyst",
    nameVi: "Thạch Anh Tím",
    color: "Purple",
    chakra: "Crown & Third Eye",
    element: "Air",
    properties: ["Spiritual Protection", "Intuition", "Clarity", "Peace"],
    propertiesVi: ["Bảo Vệ Tâm Linh", "Trực Giác", "Minh Mẫn", "Bình An"],
    healingBenefits: [
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Enhances meditation",
      "Boosts immune system",
    ],
    healingBenefitsVi: [
      "Giảm căng thẳng và lo âu",
      "Cải thiện chất lượng giấc ngủ",
      "Tăng cường thiền định",
      "Tăng cường hệ miễn dịch",
    ],
    zodiacSigns: ["Pisces", "Virgo", "Aquarius", "Capricorn"],
    cleansing: ["Moonlight", "Sage smoke", "Running water", "Sound healing"],
    cleansingVi: ["Ánh trăng", "Khói xông", "Nước chảy", "Âm thanh chữa lành"],
    meditation: "Hold amethyst during meditation to enhance spiritual connection and inner peace.",
    meditationVi: "Cầm thạch anh tím khi thiền để tăng cường kết nối tâm linh và bình an nội tâm.",
    placement: "Place in bedroom for better sleep, or in meditation space for spiritual growth.",
    placementVi: "Đặt trong phòng ngủ để ngủ ngon hơn, hoặc trong không gian thiền để phát triển tâm linh.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    nameVi: "Thạch Anh Hồng",
    color: "Pink",
    chakra: "Heart",
    element: "Water",
    properties: ["Unconditional Love", "Emotional Healing", "Self-Love", "Compassion"],
    propertiesVi: ["Tình Yêu Vô Điều Kiện", "Chữa Lành Cảm Xúc", "Tự Yêu Thương", "Lòng Từ Bi"],
    healingBenefits: ["Heals emotional wounds", "Attracts love", "Reduces anger", "Promotes forgiveness"],
    healingBenefitsVi: ["Chữa lành vết thương cảm xúc", "Thu hút tình yêu", "Giảm giận dữ", "Thúc đẩy sự tha thứ"],
    zodiacSigns: ["Taurus", "Libra"],
    cleansing: ["Rose petals", "Moonlight", "Crystal singing bowls"],
    cleansingVi: ["Cánh hoa hồng", "Ánh trăng", "Chuông pha lê"],
    meditation: "Place on heart chakra during meditation to open yourself to love and healing.",
    meditationVi: "Đặt lên luân xa tim khi thiền để mở lòng với tình yêu và sự chữa lành.",
    placement: "Keep in bedroom or living room to promote love and harmony in relationships.",
    placementVi: "Giữ trong phòng ngủ hoặc phòng khách để thúc đẩy tình yêu và hòa hợp trong các mối quan hệ.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "clear-quartz",
    name: "Clear Quartz",
    nameVi: "Thạch Anh Trắng",
    color: "Clear/White",
    chakra: "All Chakras",
    element: "All Elements",
    properties: ["Amplification", "Clarity", "Energy", "Healing"],
    propertiesVi: ["Khuếch Đại", "Minh Mẫn", "Năng Lượng", "Chữa Lành"],
    healingBenefits: ["Amplifies other crystals", "Clears mental fog", "Boosts energy", "Enhances focus"],
    healingBenefitsVi: [
      "Khuếch đại các viên pha lê khác",
      "Xóa tan sương mù tinh thần",
      "Tăng cường năng lượng",
      "Tăng cường sự tập trung",
    ],
    zodiacSigns: ["All signs"],
    cleansing: ["Sunlight", "Moonlight", "Running water", "Salt"],
    cleansingVi: ["Ánh nắng mặt trời", "Ánh trăng", "Nước chảy", "Muối"],
    meditation: "The master healer - use to amplify intentions and connect with higher consciousness.",
    meditationVi: "Bậc thầy chữa lành - sử dụng để khuếch đại ý định và kết nối với ý thức cao hơn.",
    placement: "Place anywhere to cleanse and energize the space. Perfect for crystal grids.",
    placementVi: "Đặt ở bất kỳ đâu để làm sạch và tạo năng lượng cho không gian. Hoàn hảo cho lưới pha lê.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "black-tourmaline",
    name: "Black Tourmaline",
    nameVi: "Điện Khí Thạch Đen",
    color: "Black",
    chakra: "Root",
    element: "Earth",
    properties: ["Protection", "Grounding", "Purification", "EMF Shield"],
    propertiesVi: ["Bảo Vệ", "Nối Đất", "Thanh Lọc", "Chắn Sóng Điện Từ"],
    healingBenefits: ["Blocks negative energy", "Reduces anxiety", "Improves focus", "Protects from EMF"],
    healingBenefitsVi: ["Chặn năng lượng tiêu cực", "Giảm lo âu", "Cải thiện sự tập trung", "Bảo vệ khỏi sóng điện từ"],
    zodiacSigns: ["Capricorn", "Scorpio"],
    cleansing: ["Earth burial", "Sage smoke", "Sound healing"],
    cleansingVi: ["Chôn trong đất", "Khói xông", "Âm thanh chữa lành"],
    meditation: "Hold during meditation to feel grounded and protected from negative influences.",
    meditationVi: "Cầm khi thiền để cảm thấy được nối đất và được bảo vệ khỏi những ảnh hưởng tiêu cực.",
    placement: "Place near electronics or entrance to protect from negative energy and EMF.",
    placementVi: "Đặt gần thiết bị điện tử hoặc lối vào để bảo vệ khỏi năng lượng tiêu cực và sóng điện từ.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "citrine",
    name: "Citrine",
    nameVi: "Thạch Anh Vàng",
    color: "Yellow/Golden",
    chakra: "Solar Plexus",
    element: "Fire",
    properties: ["Abundance", "Confidence", "Joy", "Manifestation"],
    propertiesVi: ["Thịnh Vượng", "Tự Tin", "Niềm Vui", "Hiện Thực Hóa"],
    healingBenefits: ["Attracts wealth", "Boosts self-esteem", "Increases motivation", "Enhances creativity"],
    healingBenefitsVi: ["Thu hút của cải", "Tăng lòng tự trọng", "Tăng động lực", "Tăng cường sáng tạo"],
    zodiacSigns: ["Gemini", "Aries", "Libra", "Leo"],
    cleansing: ["Sunlight", "Citrine cluster", "Running water"],
    cleansingVi: ["Ánh nắng mặt trời", "Cụm thạch anh vàng", "Nước chảy"],
    meditation: "Meditate with citrine to manifest abundance and boost personal power.",
    meditationVi: "Thiền với thạch anh vàng để hiện thực hóa sự thịnh vượng và tăng cường sức mạnh cá nhân.",
    placement: "Place in wealth corner (southeast) or workspace to attract prosperity.",
    placementVi: "Đặt ở góc tài lộc (hướng đông nam) hoặc nơi làm việc để thu hút thịnh vượng.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "labradorite",
    name: "Labradorite",
    nameVi: "Đá Labradorite",
    color: "Gray with blue/green flashes",
    chakra: "Third Eye & Throat",
    element: "Water",
    properties: ["Transformation", "Intuition", "Magic", "Protection"],
    propertiesVi: ["Biến Đổi", "Trực Giác", "Phép Thuật", "Bảo Vệ"],
    healingBenefits: ["Enhances psychic abilities", "Aids transformation", "Reduces anxiety", "Strengthens aura"],
    healingBenefitsVi: ["Tăng cường khả năng tâm linh", "Hỗ trợ biến đổi", "Giảm lo âu", "Tăng cường hào quang"],
    zodiacSigns: ["Leo", "Scorpio", "Sagittarius"],
    cleansing: ["Moonlight", "Sage smoke", "Crystal singing bowls"],
    cleansingVi: ["Ánh trăng", "Khói xông", "Chuông pha lê"],
    meditation: "Use during meditation to enhance intuition and connect with your inner magic.",
    meditationVi: "Sử dụng khi thiền để tăng cường trực giác và kết nối với phép thuật bên trong.",
    placement: "Keep in meditation space or wear as jewelry for daily protection and intuition.",
    placementVi: "Giữ trong không gian thiền hoặc đeo như trang sức để bảo vệ và trực giác hàng ngày.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function getCrystalRecommendations(intention: string, chakra?: string, zodiacSign?: string): Crystal[] {
  let recommendations = [...crystalsDatabase]

  // Filter by intention
  if (intention) {
    recommendations = recommendations.filter(
      (crystal) =>
        crystal.properties.some((prop) => prop.toLowerCase().includes(intention.toLowerCase())) ||
        crystal.healingBenefits.some((benefit) => benefit.toLowerCase().includes(intention.toLowerCase())),
    )
  }

  // Filter by chakra
  if (chakra && chakra !== "all") {
    recommendations = recommendations.filter(
      (crystal) =>
        crystal.chakra.toLowerCase().includes(chakra.toLowerCase()) || crystal.chakra.toLowerCase() === "all chakras",
    )
  }

  // Filter by zodiac sign
  if (zodiacSign) {
    recommendations = recommendations.filter(
      (crystal) => crystal.zodiacSigns.includes(zodiacSign) || crystal.zodiacSigns.includes("All signs"),
    )
  }

  return recommendations.slice(0, 6) // Return top 6 recommendations
}

export function getCrystalById(id: string): Crystal | undefined {
  return crystalsDatabase.find((crystal) => crystal.id === id)
}

export const crystalIntentions = [
  { value: "love", label: "Love & Relationships", labelVi: "Tình Yêu & Các Mối Quan Hệ" },
  { value: "protection", label: "Protection & Grounding", labelVi: "Bảo Vệ & Nối Đất" },
  { value: "abundance", label: "Abundance & Prosperity", labelVi: "Thịnh Vượng & Giàu Có" },
  { value: "healing", label: "Healing & Wellness", labelVi: "Chữa Lành & Sức Khỏe" },
  { value: "intuition", label: "Intuition & Spirituality", labelVi: "Trực Giác & Tâm Linh" },
  { value: "clarity", label: "Clarity & Focus", labelVi: "Minh Mẫn & Tập Trung" },
  { value: "confidence", label: "Confidence & Courage", labelVi: "Tự Tin & Can Đảm" },
  { value: "peace", label: "Peace & Calm", labelVi: "Bình An & Tĩnh Lặng" },
]

export const chakras = [
  { value: "root", label: "Root Chakra", labelVi: "Luân Xa Gốc" },
  { value: "sacral", label: "Sacral Chakra", labelVi: "Luân Xa Xương Cùng" },
  { value: "solar", label: "Solar Plexus", labelVi: "Luân Xa Thái Dương Thần Kinh" },
  { value: "heart", label: "Heart Chakra", labelVi: "Luân Xa Tim" },
  { value: "throat", label: "Throat Chakra", labelVi: "Luân Xa Cổ Họng" },
  { value: "third-eye", label: "Third Eye", labelVi: "Luân Xa Con Mắt Thứ Ba" },
  { value: "crown", label: "Crown Chakra", labelVi: "Luân Xa Đỉnh Đầu" },
  { value: "all", label: "All Chakras", labelVi: "Tất Cả Luân Xa" },
]
