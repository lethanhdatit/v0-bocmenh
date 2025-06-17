"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import type { Product, ProductAttribute } from "@/lib/products"
import { getProductBySlug } from "@/lib/products"
import { Button } from "@/components/ui/button"
import {
  Star,
  ChevronLeft,
  Share2,
  Heart,
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import ProductCard from "@/components/store/ProductCard"
import { sampleProducts } from "@/lib/products"
import { useWishlist } from "@/hooks/use-wishlist"
import { cn } from "@/lib/utils"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const { isWishlisted, toggleWishlist, isWishlistLoaded } = useWishlist()

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        setIsLoading(true)
        try {
          const fetchedProduct = await getProductBySlug(slug)
          if (fetchedProduct) {
            setProduct(fetchedProduct)
            const related = sampleProducts
              .filter(
                (p) =>
                  p.categories.some((cat) => fetchedProduct.categories.includes(cat)) && p.id !== fetchedProduct.id,
              )
              .slice(0, 3)
            setRelatedProducts(related)
          } else {
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
      alert(t("store.shareNotSupported"))
    }
  }

  const renderSuggestion = (titleKey: string, suggestions?: ProductAttribute[], icon?: React.ReactNode) => {
    if (!suggestions || suggestions.length === 0) return null
    return (
      <div className="mb-4">
        <h4 className="text-md font-semibold text-yellow-300 mb-2 flex items-center">
          {icon || <Info className="w-5 h-5 mr-2 text-yellow-400" />}
          {t(titleKey)}
        </h4>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-gray-300">
          {suggestions.map((attr, index) => (
            <li key={index}>
              {t(`attributes.${attr.type}.${attr.value}`, attr.value)}
              {attr.description && <span className="text-gray-400 italic"> - {attr.description}</span>}
            </li>
          ))}
        </ul>
      </div>
    )
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
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700">
            <Image
              src={product.images[0] || "/placeholder.svg?width=600&height=600&query=detailed+fengshui+item"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

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

            <div className="space-y-3 mb-6 text-sm">
              {product.menhChinh && (
                <p>
                  <strong className="text-gray-400">{t("store.goodForMenh")}:</strong>{" "}
                  <span className="text-yellow-300">{product.menhChinh}</span>
                </p>
              )}
              {product.nguHanhSanPham && (
                <p>
                  <strong className="text-gray-400">{t("store.productElement")}:</strong>{" "}
                  <span className="text-yellow-300">{product.nguHanhSanPham}</span>
                </p>
              )}
              {product.cung && (
                <p>
                  <strong className="text-gray-400">{t("store.cung")}:</strong>{" "}
                  <span className="text-yellow-300">{product.cung}</span>
                </p>
              )}
              {product.khi && (
                <p>
                  <strong className="text-gray-400">{t("store.khi")}:</strong>{" "}
                  <span className="text-yellow-300">{product.khi}</span>
                </p>
              )}
            </div>

            {product.attributes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-400 uppercase mb-2">{t("store.fengShuiProperties")}:</h3>
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

            {/* Suggestion Logic Display */}
            {product.suggestionLogic && (
              <div className="my-6 p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">{t("store.fengShuiSuggestions")}</h3>
                {renderSuggestion(
                  "store.suggestionEnhances",
                  product.suggestionLogic.enhances,
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />,
                )}
                {renderSuggestion(
                  "store.suggestionBalances",
                  product.suggestionLogic.balances,
                  <ShieldCheck className="w-5 h-5 mr-2 text-blue-400" />,
                )}
                {renderSuggestion(
                  "store.suggestionMitigates",
                  product.suggestionLogic.mitigates,
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />,
                )}
              </div>
            )}

            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-grow bg-yellow-500 hover:bg-yellow-400 text-black transition-colors"
                asChild
              >
                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                  {t("store.viewOn")} {product.affiliateName || t("store.partnerSite")}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
              {isWishlistLoaded && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "bg-gray-800/70 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400",
                    isWishlisted(product.id) && "border-red-500 text-red-500 hover:border-red-400 hover:text-red-400",
                  )}
                >
                  <Heart className={cn("mr-2 h-5 w-5", isWishlisted(product.id) && "fill-current")} />
                  {isWishlisted(product.id) ? t("store.removeFromWishlist") : t("store.addToWishlist")}
                </Button>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleShare}
              className="mt-4 text-gray-400 hover:text-yellow-400 self-center sm:self-start"
            >
              <Share2 className="mr-2 h-4 w-4" /> {t("store.share")}
            </Button>
          </div>
        </div>

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
