export interface ProductAttribute {
  type: string // e.g., 'mệnh', 'tử vi', 'numerology', 'mục đích', 'sao xấu', 'menhKhac'
  value: string // e.g., 'Kim', 'Tý', 'Số 1', 'Tài Lộc', 'Thái Tuế', 'Thổ'
  description?: string // Optional description for the attribute's effect
}

export interface ProductSuggestionLogic {
  // Gợi ý dựa trên thuộc tính người dùng CÓ
  enhances?: ProductAttribute[] // Vật phẩm này tốt cho người có thuộc tính này
  // Gợi ý dựa trên thuộc tính người dùng THIẾU hoặc cần CÂN BẰNG
  balances?: ProductAttribute[] // Vật phẩm này giúp cân bằng nếu người dùng có thuộc tính này
  // Gợi ý để GIẢM TIÊU CỰC
  mitigates?: ProductAttribute[] // Vật phẩm này giúp giảm tiêu cực cho người có thuộc tính này
}

export interface Product {
  id: string
  name: string
  description: string
  price: number // Giá tham khảo trên trang affiliate
  images: string[]
  categories: string[] // e.g., ['Mệnh Kim', 'Tài Lộc', 'Vòng Tay']
  slug: string

  affiliateLink: string // Link đến trang sản phẩm của đối tác
  affiliateName?: string // Tên đối tác, ví dụ "Shopee", "Tiki"

  // Thông tin phong thủy chi tiết
  cung?: string // e.g., "Càn", "Khảm", "Cấn", "Chấn", "Tốn", "Ly", "Khôn", "Đoài"
  menhChinh?: string // Mệnh chính của người hợp sản phẩm, e.g., "Kim", "Mộc", "Thủy", "Hỏa", "Thổ"
  nguHanhSanPham?: string // Ngũ hành của bản thân sản phẩm, e.g., "Kim", "Mộc"
  khi?: string // Khí của sản phẩm, e.g., "Dương", "Âm", "Bình Hòa"

  attributes: ProductAttribute[] // Các thuộc tính phong thuỷ cố hữu của vật phẩm
  suggestionLogic?: ProductSuggestionLogic // Logic để gợi ý sản phẩm dựa trên thuộc tính người dùng

  // Các trường này ít quan trọng hơn với mô hình affiliate
  inventory: number // Có thể là số lượng ước tính hoặc bỏ qua
  rating?: number // Đánh giá từ trang affiliate (nếu có)
  reviews?: number // Số lượt đánh giá từ trang affiliate (nếu có)
}

export const sampleProducts: Product[] = [
  {
    id: "prod_001",
    name: "Vòng Tay Đá Thạch Anh Vàng",
    description: "Mang lại may mắn, tài lộc và năng lượng tích cực. Đá thạch anh vàng tự nhiên, chế tác tinh xảo.",
    price: 890000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Vòng Tay", "Đá Quý", "Tài Lộc"],
    slug: "vong-tay-da-thach-anh-vang",
    affiliateLink: "https://shopee.vn/vong-tay-thach-anh-vang-example",
    affiliateName: "Shopee",
    menhChinh: "Thổ", // Hợp nhất với mệnh Thổ
    nguHanhSanPham: "Thổ", // Thạch anh vàng thuộc hành Thổ
    khi: "Dương",
    cung: "Khôn, Cấn", // Hợp với người cung Khôn, Cấn
    attributes: [
      { type: "chất liệu", value: "Đá Thạch Anh Vàng" },
      { type: "màu sắc", value: "Vàng" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Thổ", description: "Tương hợp, tăng cường bản mệnh." },
        { type: "mệnh", value: "Kim", description: "Tương sinh (Thổ sinh Kim), hỗ trợ tốt." },
      ],
      balances: [
        {
          type: "mệnh",
          value: "Mộc",
          description: "Nếu Mộc quá yếu, Thổ có thể hỗ trợ (Mộc dựa vào Thổ để phát triển).",
        },
      ],
      mitigates: [
        { type: "khí xấu", value: "Uế khí", description: "Thạch anh vàng giúp thanh lọc năng lượng tiêu cực." },
      ],
    },
    inventory: 50,
    rating: 4.8,
    reviews: 120,
  },
  {
    id: "prod_002",
    name: "Tượng Phật Di Lặc Gỗ Bách Xanh",
    description: "Biểu tượng của sự an lạc, vui vẻ và may mắn. Gỗ bách xanh thơm dịu, vân gỗ đẹp.",
    price: 1500000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Tượng Phong Thủy", "An Lạc"],
    slug: "tuong-phat-di-lac-go-bach-xanh",
    affiliateLink: "https://tiki.vn/tuong-phat-di-lac-example",
    affiliateName: "Tiki",
    menhChinh: "Mộc",
    nguHanhSanPham: "Mộc",
    khi: "Bình Hòa",
    attributes: [
      { type: "chất liệu", value: "Gỗ Bách Xanh" },
      { type: "ý nghĩa", value: "An lạc, Hạnh phúc" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Mộc", description: "Tương hợp, tăng cường bản mệnh." },
        { type: "mệnh", value: "Hỏa", description: "Tương sinh (Mộc sinh Hỏa), hỗ trợ mạnh mẽ." },
      ],
    },
    inventory: 30,
    rating: 4.9,
    reviews: 95,
  },
  {
    id: "prod_003",
    name: "Quả Cầu Phong Thủy Đá Obsidian",
    description: "Hóa giải năng lượng tiêu cực, tăng cường sự tập trung, bảo vệ chủ nhân. Đá Obsidian đen huyền bí.",
    price: 1200000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Quả Cầu Phong Thủy", "Bảo Vệ"],
    slug: "qua-cau-phong-thuy-da-obsidian",
    affiliateLink: "https://lazada.vn/obsidian-sphere-example",
    affiliateName: "Lazada",
    menhChinh: "Thủy",
    nguHanhSanPham: "Thủy", // Obsidian thường được coi là hành Thủy
    khi: "Âm",
    attributes: [
      { type: "chất liệu", value: "Đá Obsidian" },
      { type: "màu sắc", value: "Đen" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Thủy", description: "Tương hợp, tăng cường bản mệnh." },
        { type: "mệnh", value: "Mộc", description: "Tương sinh (Thủy sinh Mộc), nuôi dưỡng tốt." },
      ],
      mitigates: [
        { type: "sao xấu", value: "Ngũ Hoàng Đại Sát", description: "Obsidian có khả năng hóa giải sát khí mạnh." },
        { type: "năng lượng tiêu cực", value: "Trược khí", description: "Giúp thanh tẩy không gian, bảo vệ chủ nhân." },
      ],
    },
    inventory: 25,
    rating: 4.7,
    reviews: 70,
  },
  {
    id: "prod_004",
    name: "Chuỗi Vòng Trầm Hương 108 Hạt",
    description: "Mang lại bình an, tĩnh tâm, xua đuổi tà khí. Trầm hương tự nhiên, hương thơm thanh khiết.",
    price: 2500000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Vòng Tay", "Trầm Hương", "Bình An"],
    slug: "chuoi-vong-tram-huong-108-hat",
    affiliateLink: "https://shopee.vn/tram-huong-108-example",
    affiliateName: "Shopee",
    nguHanhSanPham: "Mộc", // Trầm hương thuộc Mộc
    khi: "Dương", // Trầm hương có tính dương mạnh
    attributes: [
      { type: "chất liệu", value: "Trầm Hương Tự Nhiên" },
      { type: "số hạt", value: "108" },
    ],
    suggestionLogic: {
      enhances: [
        // Trầm hương nói chung tốt cho nhiều mệnh, đặc biệt là người cần tăng dương khí, sự tĩnh tâm
        { type: "tâm trạng", value: "Căng thẳng", description: "Giúp thư giãn, giảm stress." },
        { type: "tinh thần", value: "Thiếu tập trung", description: "Tăng cường sự tập trung, minh mẫn." },
      ],
      mitigates: [{ type: "tà khí", value: "Năng lượng xấu", description: "Xua đuổi tà khí, bảo vệ chủ nhân." }],
    },
    inventory: 40,
    rating: 4.9,
    reviews: 150,
  },
  {
    id: "prod_005",
    name: "Tháp Văn Xương Đá Ngọc Hoàng Long",
    description:
      "Biểu tượng của trí tuệ, học vấn và sự thăng tiến trong công danh, sự nghiệp. Đá Ngọc Hoàng Long tự nhiên.",
    price: 950000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Vật Phẩm Để Bàn", "Công Danh", "Học Vấn"],
    slug: "thap-van-xuong-da-ngoc-hoang-long",
    affiliateLink: "https://tiki.vn/thap-van-xuong-example",
    affiliateName: "Tiki",
    menhChinh: "Thổ",
    nguHanhSanPham: "Thổ", // Ngọc Hoàng Long thuộc Thổ
    khi: "Dương",
    attributes: [
      { type: "chất liệu", value: "Đá Ngọc Hoàng Long" },
      { type: "hình dáng", value: "Tháp Văn Xương 9 tầng" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Thổ", description: "Tương hợp, củng cố nền tảng." },
        { type: "mệnh", value: "Kim", description: "Tương sinh (Thổ sinh Kim), thúc đẩy thành công." },
        { type: "mục tiêu", value: "Thi cử", description: "Hỗ trợ việc học hành, thi cử đạt kết quả cao." },
        { type: "mục tiêu", value: "Sự nghiệp", description: "Thúc đẩy con đường công danh, sự nghiệp hanh thông." },
        {
          type: "thuộc tính người dùng",
          value: "Sao Văn Xương chiếu mệnh",
          description: "Kích hoạt năng lượng học vấn, trí tuệ.",
        },
      ],
    },
    inventory: 35,
    rating: 4.8,
    reviews: 60,
  },
]

export const getProducts = async (filters?: any): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay
  // Basic filtering example (can be much more complex)
  if (filters?.category) {
    return sampleProducts.filter((p) => p.categories.includes(filters.category))
  }
  if (filters?.slug) {
    return sampleProducts.filter((p) => p.slug === filters.slug)
  }
  return sampleProducts
}

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50)) // Simulate API delay
  return sampleProducts.find((p) => p.slug === slug)
}
