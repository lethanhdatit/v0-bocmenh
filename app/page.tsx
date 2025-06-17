import type { Metadata } from "next"
import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LuckyBoxSection from "@/components/sections/LuckyBoxSection"
import Navigation from "@/components/layout/Navigation"

export const metadata: Metadata = {
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
  description: "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình",
}

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <LuckyBoxSection />
    </main>
  )
}
