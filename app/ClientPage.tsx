"use client"

import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LuckyBoxSection from "@/components/sections/LuckyBoxSection"
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection"
import Navigation from "@/components/layout/Navigation"

export default function ClientPage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <LuckyBoxSection />
      <FeaturedProductsSection />
    </main>
  )
}
