"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import type { Product } from "@/lib/products"
import { getProductBySlug } from "@/lib/products" // Using local import for now
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, ChevronLeft, Share2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import ProductCard from "@/components/store/ProductCard" // For related products
import { sampleProducts } from "@/lib/products" // For related products

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        setIsLoading(true)
        try {
          const fetchedProduct = await getProductBySlug(slug)
          if (fetchedProduct) {
            setProduct(fetchedProduct)
            // Fetch related products (simple logic: same primary category, different product)
            const related = sampleProducts
              .filter((p) => p.categories.includes(fetchedProduct.categories[0]) && p.id !== fetchedProduct.id)
              .slice(0, 3)
            setRelatedProducts(related)
          } else {
            // Handle product not found, maybe redirect or show 404
            router.push("/store")
          }
        } catch (error) {
          console.error("Failed to fetch product:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchProduct()
    }
  }, [slug, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const handleShare = () => {
    if (navigator.share && product) {
      navigator
        .share({
          title: product.name,
          text: `${product.name} - ${t("store.checkOutProduct")}`,
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      // Fallback for browsers that don't support navigator.share
      alert(t("store.shareNotSupported"))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      // Fallback if product is still null after loading (e.g., not found)
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20 px-4">
        <h2 className="text-2xl text-yellow-500 mb-4">{t("store.productNotFound")}</h2>
        <Button onClick={() => router.push("/store")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> {t("store.backToStore")}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 bg-gray-800/70 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {t("store.back")}
        </Button>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Product Images */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700">
            <Image
              src={product.images[0] || "/placeholder.svg"} // Assuming first image is primary
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* TODO: Image gallery for multiple images */}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-3">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating!) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">
                  ({product.reviews || 0} {t("store.reviews")})
                </span>
              </div>
            )}

            <p className="text-2xl sm:text-3xl font-bold text-white mb-6">{formatPrice(product.price)}</p>

            <div className="prose prose-invert prose-sm sm:prose-base text-gray-300 mb-6">
              <p>{product.description}</p>
            </div>

            {/* Categories/Attributes */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">{t("store.categories")}:</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-gray-700 text-xs text-gray-300 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            {product.attributes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">{t("store.fengShuiProperties")}:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.attributes.map((attr) => (
                    <span
                      key={`${attr.type}-${attr.value}`}
                      className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/30"
                    >
                      {t(`attributes.${attr.type}.${attr.value}`, attr.value)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-grow bg-yellow-500 hover:bg-yellow-400 text-black transition-colors"
                // onClick={() => addToCart(product)} // Placeholder
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> {t("store.addToCart")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400"
              >
                <Share2 className="mr-2 h-5 w-5" /> {t("store.share")}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
              {product.inventory > 0 ? `${t("store.inStock", { count: product.inventory })}` : t("store.outOfStock")}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-6">{t("store.relatedProducts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
