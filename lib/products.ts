export interface ProductAttribute {
  type: string // e.g., 'mệnh', 'tử vi', 'numerology', 'mục đích'
  value: string // e.g., 'Kim', 'Tý', 'Số 1', 'Tài Lộc'
}

export interface ProductSuggestionLogic {
  // Gợi ý dựa trên thuộc tính người dùng CÓ
  enhances?: ProductAttribute[] // Vật phẩm này tốt cho người có thuộc tính này
  // Gợi ý dựa trên thuộc tính người dùng THIẾU hoặc cần CÂN BẰNG
  balances?: ProductAttribute[] // Vật phẩm này giúp cân bằng nếu người dùng có thuộc tính này (ví dụ, mệnh Hoả quá vượng -> cần Thuỷ)
  // Gợi ý để GIẢM TIÊU CỰC
  mitigates?: ProductAttribute[] // Vật phẩm này giúp giảm tiêu cực cho người có thuộc tính này
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  categories: string[] // e.g., ['Mệnh Kim', 'Tài Lộc', 'Vòng Tay']
  attributes: ProductAttribute[] // Các thuộc tính phong thuỷ của vật phẩm
  suggestionLogic?: ProductSuggestionLogic // Logic để gợi ý sản phẩm
  slug: string
  inventory: number
  rating?: number
  reviews?: number
}

export const sampleProducts: Product[] = [
  {
    id: "prod_001",
    name: "Vòng Tay Đá Thạch Anh Vàng",
    description: "Mang lại may mắn, tài lộc và năng lượng tích cực cho người mệnh Thổ và mệnh Kim.",
    price: 890000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Vòng Tay", "Đá Quý", "Tài Lộc", "Mệnh Thổ", "Mệnh Kim"],
    attributes: [
      { type: "mệnh", value: "Thổ" },
      { type: "mệnh", value: "Kim" },
      { type: "mục đích", value: "Tài Lộc" },
      { type: "loại", value: "Vòng Tay" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Thổ" },
        { type: "mệnh", value: "Kim" },
      ],
      balances: [{ type: "mệnh", value: "Mộc" }], // Thổ sinh Kim, Kim khắc Mộc. Nếu Mộc vượng, có thể dùng Kim để chế khắc.
    },
    slug: "vong-tay-da-thach-anh-vang",
    inventory: 50,
    rating: 4.8,
    reviews: 120,
  },
  {
    id: "prod_002",
    name: "Tượng Phật Di Lặc Gỗ Bách Xanh",
    description: "Biểu tượng của sự an lạc, vui vẻ và may mắn, hợp với người mệnh Mộc và mệnh Hỏa.",
    price: 1500000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Tượng Phong Thủy", "An Lạc", "Mệnh Mộc", "Mệnh Hỏa"],
    attributes: [
      { type: "mệnh", value: "Mộc" },
      { type: "mệnh", value: "Hỏa" },
      { type: "mục đích", value: "An Lạc" },
      { type: "chất liệu", value: "Gỗ Bách Xanh" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Mộc" },
        { type: "mệnh", value: "Hỏa" },
      ],
    },
    slug: "tuong-phat-di-lac-go-bach-xanh",
    inventory: 30,
    rating: 4.9,
    reviews: 95,
  },
  {
    id: "prod_003",
    name: "Quả Cầu Phong Thủy Đá Obsidian",
    description: "Hóa giải năng lượng tiêu cực, tăng cường sự tập trung, bảo vệ chủ nhân. Hợp mệnh Thủy, Mộc.",
    price: 1200000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Quả Cầu Phong Thủy", "Bảo Vệ", "Mệnh Thủy", "Mệnh Mộc"],
    attributes: [
      { type: "mệnh", value: "Thủy" },
      { type: "mệnh", value: "Mộc" },
      { type: "mục đích", value: "Bảo Vệ" },
      { type: "mục đích", value: "Hóa Giải Năng Lượng Xấu" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Thủy" },
        { type: "mệnh", value: "Mộc" },
      ],
      mitigates: [{ type: "sao xấu", value: "Thái Tuế" }], // Ví dụ
    },
    slug: "qua-cau-phong-thuy-da-obsidian",
    inventory: 25,
    rating: 4.7,
    reviews: 70,
  },
  {
    id: "prod_004",
    name: "Chuỗi Vòng Trầm Hương 108 Hạt",
    description: "Mang lại bình an, tĩnh tâm, xua đuổi tà khí. Phù hợp với tất cả các mệnh.",
    price: 2500000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Vòng Tay", "Trầm Hương", "Bình An", "Tất Cả Mệnh"],
    attributes: [
      { type: "mục đích", value: "Bình An" },
      { type: "mục đích", value: "Tĩnh Tâm" },
      { type: "chất liệu", value: "Trầm Hương" },
    ],
    slug: "chuoi-vong-tram-huong-108-hat",
    inventory: 40,
  },
  {
    id: "prod_005",
    name: "Tháp Văn Xương Đá Ngọc Hoàng Long",
    description:
      "Biểu tượng của trí tuệ, học vấn và sự thăng tiến trong công danh, sự nghiệp. Tốt cho người mệnh Thổ, Kim.",
    price: 950000,
    images: ["/placeholder.svg?width=400&height=400"],
    categories: ["Vật Phẩm Để Bàn", "Công Danh", "Học Vấn", "Mệnh Thổ", "Mệnh Kim"],
    attributes: [
      { type: "mệnh", value: "Thổ" },
      { type: "mệnh", value: "Kim" },
      { type: "mục đích", value: "Công Danh" },
      { type: "mục đích", value: "Học Vấn" },
    ],
    suggestionLogic: {
      enhances: [
        { type: "mệnh", value: "Thổ" },
        { type: "mệnh", value: "Kim" },
        { type: "numerology", value: "4" }, // Số 4 liên quan đến học vấn, nền tảng
        { type: "numerology", value: "8" }, // Số 8 liên quan đến thành công, quyền lực
      ],
    },
    slug: "thap-van-xuong-da-ngoc-hoang-long",
    inventory: 35,
    rating: 4.8,
    reviews: 60,
  },
  // Thêm các sản phẩm khác ở đây
]

// Function to get products, can be expanded with filtering/sorting
export const getProducts = async (filters?: any): Promise<Product[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
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
  await new Promise((resolve) => setTimeout(resolve, 300))
  return sampleProducts.find((p) => p.slug === slug)
}
