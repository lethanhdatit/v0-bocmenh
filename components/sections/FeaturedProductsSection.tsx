"use client"

import { useTranslation } from "react-i18next"
import Link from "next/link"
import ProductCard from "@/components/store/ProductCard"
import { sampleProducts } from "@/lib/products"

export default function FeaturedProductsSection() {
  const { t } = useTranslation()
  const featuredProducts = sampleProducts.slice(0, 4) // Get first 4 products as featured

  return (
    <section id="featured-products-section" className="py-12 sm:py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-4">{t("home.featuredProducts")}</h2>
        <p className="text-center text-gray-300 mb-10 max-w-xl mx-auto">{t("home.featuredProductsDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/store"
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors font-semibold"
          >
            {t("home.viewAllProducts")}
          </Link>
        </div>
      </div>
    </section>
  )
}
