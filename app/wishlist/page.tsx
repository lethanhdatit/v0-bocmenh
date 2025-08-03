"use client"

import { useEffect, useState } from "react"
import { useWishlist } from "@/hooks/use-wishlist"
import { getProductById, type Product } from "@/lib/products" // Assuming getProductById exists
import ProductCard from "@/components/store/ProductCard"
import { useTranslation } from "react-i18next"
import { HeartCrack, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const { t } = useTranslation()
  const { wishlistProductIds, isWishlistLoaded, removeFromWishlist } = useWishlist()
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  useEffect(() => {
    if (isWishlistLoaded) {
      const products = wishlistProductIds
        .map((id) => getProductById(id))
        .filter((product): product is Product => product !== undefined)
      setWishlistItems(products)
      setIsLoadingProducts(false)
    }
  }, [wishlistProductIds, isWishlistLoaded])

  if (!isWishlistLoaded || isLoadingProducts) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-400">{t("common.loading")}</div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center">
        <HeartCrack className="w-24 h-24 text-yellow-500/30 mb-6" />
        <h1 className="text-3xl font-semibold text-white mb-3">{t("wishlist.emptyTitle")}</h1>
        <p className="text-gray-400 mb-8 max-w-md">{t("wishlist.emptySubtitle")}</p>
        <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black">
          <Link href="/store">
            <ShoppingBag className="mr-2 h-5 w-5" />
            {t("wishlist.browseProducts")}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4 text-center sm:text-left">{t("wishlist.title")}</h1>
        <p className="text-lg text-gray-300 mb-10 text-center sm:text-left">
          {t("wishlist.subtitle", { count: wishlistItems.length })}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
