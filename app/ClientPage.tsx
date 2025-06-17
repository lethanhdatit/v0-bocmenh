"use client"

import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LuckyBoxSection from "@/components/sections/LuckyBoxSection"
import Navigation from "@/components/layout/Navigation"

// 1. Import ProductCard and sampleProducts
import ProductCard from "@/components/store/ProductCard"
import { sampleProducts } from "@/lib/products" // For featured products
import { useLanguage } from "@/contexts/LanguageContext" // Import useLanguage
import Link from "next/link"

export default function ClientPage() {
  // 2. Inside HomePage component, before return:
  const { t } = useLanguage() // Initialize t function
  const featuredProducts = sampleProducts.slice(0, 4) // Get first 4 products as featured

  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <LuckyBoxSection />
      {/* 3. After <LuckyBoxSection />, add the Featured Products section: */}
      <section className="py-12 sm:py-16 bg-gray-900/50">
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
    </main>
  )
}
