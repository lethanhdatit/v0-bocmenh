"use client"

import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LuckyBoxSection from "@/components/sections/LuckyBoxSection"
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection"
import Navigation from "@/components/layout/Navigation"
import ScrollTourButton, { TourStep } from "@/components/ui/ScrollTourButton"

const tourSteps: TourStep[] = [
  {
    target: "#features-section",
    titleKey: "tour.features.title",
    descriptionKey: "tour.features.description",
    disableBeacon: true,
  },
  {
    target: "#luckybox-section",
    titleKey: "tour.luckybox.title",
    descriptionKey: "tour.luckybox.description",
  },
  {
    target: "#featured-products-section",
    titleKey: "tour.featuredProducts.title",
    descriptionKey: "tour.featuredProducts.description",
  },
]

export default function ClientPage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <LuckyBoxSection />
      <FeaturedProductsSection />
      <ScrollTourButton steps={tourSteps} />
    </main>
  )
}
