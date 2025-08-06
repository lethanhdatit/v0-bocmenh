"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Star, Heart, ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useWishlist } from "@/hooks/use-wishlist"
import { cn } from "@/lib/infra/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation()
  const { isWishlisted, toggleWishlist, isWishlistLoaded } = useWishlist()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent link navigation if card is wrapped in Link
    e.stopPropagation()
    if (isWishlistLoaded) {
      toggleWishlist(product.id)
    }
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition-shadow duration-300 flex flex-col group">
      <Link href={`/store/${product.slug}`} className="block relative">
        <div className="relative w-full h-56 sm:h-64">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {isWishlistLoaded && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/30 hover:bg-black/60 text-white rounded-full"
            onClick={handleWishlistToggle}
            aria-label={isWishlisted(product.id) ? t("store.removeFromWishlist") : t("store.addToWishlist")}
          >
            <Heart className={cn("w-5 h-5", isWishlisted(product.id) ? "fill-red-500 text-red-500" : "text-white")} />
          </Button>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/store/${product.slug}`}>
          <h3
            className="text-lg font-semibold text-yellow-400 hover:text-yellow-300 transition-colors mb-1 truncate"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mb-1">
          {t("store.goodForMenh")}:{" "}
          <span className="font-semibold text-gray-300">{product.menhChinh || t("common.notSpecified")}</span>
        </p>
        {product.nguHanhSanPham && (
          <p className="text-gray-400 text-xs mb-2">
            {t("store.productElement")}: <span className="font-semibold text-gray-300">{product.nguHanhSanPham}</span>
          </p>
        )}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 flex-grow" title={product.description}>
          {product.description}
        </p>

        {product.rating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating!) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`}
              />
            ))}
            <span className="ml-2 text-xs text-gray-400">
              ({product.reviews || 0} {t("store.reviews")})
            </span>
          </div>
        )}

        <div className="mt-auto">
          <p className="text-xl font-bold text-white mb-3">{formatPrice(product.price)}</p>
          <Button
            variant="default"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black transition-colors"
            asChild
          >
            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
              {t("store.viewOn")} {product.affiliateName || t("store.partnerSite")}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
