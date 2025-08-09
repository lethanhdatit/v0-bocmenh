"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
// import type { Product, ProductAttribute } from "@/lib/products"
// import { getProductBySlug } from "@/lib/products"
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/store/ProductCard";
// import { sampleProducts } from "@/lib/products"
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/infra/utils";
import { ProductDetail } from "@/lib/products";

export default function Page({
  data,
  slug,
}: {
  data: ProductDetail;
  slug: string;
}) {
  // const [product, setProduct] = useState<Product | null>(null)
  // const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { isWishlisted, toggleWishlist, isWishlistLoaded } = useWishlist();

  // useEffect(() => {
  //   if (slug) {
  //     const fetchProduct = async () => {
  //       setIsLoading(true)
  //       try {
  //         const fetchedProduct = await getProductBySlug(slug)
  //         if (fetchedProduct) {
  //           setProduct(fetchedProduct)
  //           const related = sampleProducts
  //             .filter(
  //               (p) =>
  //                 p.categories.some((cat) => fetchedProduct.categories.includes(cat)) && p.id !== fetchedProduct.id,
  //             )
  //             .slice(0, 3)
  //           setRelatedProducts(related)
  //         } else {
  //           router.push("/store")
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch product:", error)
  //       } finally {
  //         setIsLoading(false)
  //       }
  //     }
  //     fetchProduct()
  //   }
  // }, [slug, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // const handleShare = () => {
  //   if (navigator.share && product) {
  //     navigator
  //       .share({
  //         title: product.name,
  //         text: `${product.name} - ${t("store.checkOutProduct")}`,
  //         url: window.location.href,
  //       })
  //       .catch(console.error)
  //   } else {
  //     alert(t("store.shareNotSupported"))
  //   }
  // }

  // const renderSuggestion = (titleKey: string, suggestions?: ProductAttribute[], icon?: React.ReactNode) => {
  //   if (!suggestions || suggestions.length === 0) return null
  //   return (
  //     <div className="mb-4">
  //       <h4 className="text-md font-semibold text-yellow-300 mb-2 flex items-center">
  //         {icon || <Info className="w-5 h-5 mr-2 text-yellow-400" />}
  //         {t(titleKey)}
  //       </h4>
  //       <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-gray-300">
  //         {suggestions.map((attr, index) => (
  //           <li key={index}>
  //             {t(`attributes.${attr.type}.${attr.value}`, attr.value)}
  //             {attr.description && <span className="text-gray-400 italic"> - {attr.description}</span>}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   )
  // }

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
  //     </div>
  //   )
  // }

  // if (!product) {
  //   return (
  //     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20 px-4">
  //       <h2 className="text-2xl text-yellow-500 mb-4">{t("store.productNotFound")}</h2>
  //       <Button onClick={() => router.push("/store")}>
  //         <ChevronLeft className="mr-2 h-4 w-4" /> {t("store.backToStore")}
  //       </Button>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-3">
        {t("store.affiliateProducts")}
      </h1>
      <h4>{slug}</h4>
      <h4>{JSON.stringify(data)}</h4>
    </div>
  );
}
