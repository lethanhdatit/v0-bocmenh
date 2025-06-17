"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/lib/products"
import ProductCard from "@/components/store/ProductCard"
import { useAuth } from "@/contexts/AuthContext" // Assuming user profile might have 'mệnh', 'cung' etc.
import { useTranslation } from "react-i18next"
import { ListFilter, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sampleProducts as allSampleProducts } from "@/lib/products" // Import all products for filtering

// Mock user attributes for demonstration if AuthContext doesn't provide them yet
const mockUserAttributes = {
  menhChinh: "Kim", // Mệnh chính của người dùng
  cung: "Càn",
  // ... other attributes like numerology, zodiac if needed for suggestions
  needsBalance: "Mộc", // Example: User is Kim, might need Mộc for balance
  currentIssues: [{ type: "sao xấu", value: "Thái Tuế" }], // Example: User is facing a negative star
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])

  // New filters for Feng Shui properties
  const [selectedMenh, setSelectedMenh] = useState<string[]>([])
  const [allMenh, setAllMenh] = useState<string[]>(["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"]) // Predefined list

  const { user } = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // In a real app, this might be an API call
        // const { sampleProducts: fetchedProducts } = await import("@/lib/products")
        setProducts(allSampleProducts)
        setFilteredProducts(allSampleProducts)

        const uniqueCategories = Array.from(new Set(allSampleProducts.flatMap((p) => p.categories)))
        setAllCategories(uniqueCategories.sort())

        // Extract unique 'menhChinh' for filtering if needed, or use predefined list
        // const uniqueMenh = Array.from(new Set(allSampleProducts.map(p => p.menhChinh).filter(m => m) as string[]));
        // setAllMenh(uniqueMenh.sort());
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let tempProducts = products

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((p) => selectedCategories.every((cat) => p.categories.includes(cat)))
    }

    // Filter by selected menh
    if (selectedMenh.length > 0) {
      tempProducts = tempProducts.filter((p) => selectedMenh.every((menh) => p.menhChinh === menh))
    }

    setFilteredProducts(tempProducts)
  }, [searchTerm, selectedCategories, selectedMenh, products])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleMenhToggle = (menh: string) => {
    setSelectedMenh((prev) => (prev.includes(menh) ? prev.filter((m) => m !== menh) : [...prev, menh]))
  }

  // Placeholder for smart suggestions
  const getSmartSuggestions = (): Product[] => {
    if (!products.length) return []
    // Simple example: suggest items matching user's "mệnh"
    // Or items that balance what user "needs"
    const currentUserAttributes = user ? { menhChinh: user.menhChinh /* ... other attributes */ } : mockUserAttributes

    return products
      .filter((product) => {
        if (
          product.suggestionLogic?.enhances?.some(
            (attr) => attr.type === "mệnh" && attr.value === currentUserAttributes.menhChinh,
          )
        ) {
          return true
        }
        if (
          product.suggestionLogic?.balances?.some(
            (attr) => attr.type === "mệnh" && attr.value === currentUserAttributes.needsBalance,
          )
        ) {
          return true
        }
        return false
      })
      .slice(0, 3) // Show top 3 suggestions
  }

  const smartSuggestedProducts = getSmartSuggestions()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-4">{t("store.title")}</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t("store.description")}</p>
      </header>

      {/* Smart Suggestions Section */}
      {smartSuggestedProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-6 text-center sm:text-left">
            {t("store.recommendedForYou")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {smartSuggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full sm:w-auto">
          <Input
            type="search"
            placeholder={t("store.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-yellow-500 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400 w-full sm:w-auto"
            >
              <ListFilter className="mr-2 h-4 w-4" /> {t("store.filterCategories")} ({selectedCategories.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700 text-white">
            <DropdownMenuLabel className="text-yellow-500">{t("store.categories")}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {allCategories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
                className="hover:!bg-gray-800 focus:!bg-gray-800 data-[highlighted]:!bg-gray-800"
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400 w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-4 w-4" /> {t("store.filterMenh")} ({selectedMenh.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700 text-white">
            <DropdownMenuLabel className="text-yellow-500">{t("store.menh")}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {allMenh.map((menh) => (
              <DropdownMenuCheckboxItem
                key={menh}
                checked={selectedMenh.includes(menh)}
                onCheckedChange={() => handleMenhToggle(menh)}
                className="hover:!bg-gray-800 focus:!bg-gray-800 data-[highlighted]:!bg-gray-800"
              >
                {menh}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg py-10">{t("store.noProductsFound")}</p>
      )}
    </div>
  )
}
