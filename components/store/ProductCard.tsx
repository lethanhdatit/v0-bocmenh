"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition-shadow duration-300 flex flex-col">
      <Link href={`/store/${product.slug}`} className="block">
        <div className="relative w-full h-56 sm:h-64">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
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
            // onClick={() => addToCart(product)} // Placeholder for future cart functionality
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> {t("store.addToCart")}
          </Button>
        </div>
      </div>
    </div>
  )
}
