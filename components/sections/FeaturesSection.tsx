"use client"

import { motion } from "framer-motion"
import {
  Sparkles,
  Moon,
  Calculator,
  WalletCardsIcon as Cards,
  Home,
  Heart,
  Star,
  Eye,
  Gem,
  NotebookIcon as Lotus,
  FileText,
  Building,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { usePathname } from "next/navigation"

export default function FeaturesSection() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const currentLocale = pathname.split("/")[1] || "vi"

  const features = [
    {
      icon: Sparkles,
      title: t("features.destiny.title"),
      description: t("features.destiny.description"),
      href: `/${currentLocale}/destiny`,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Moon,
      title: t("features.dreams.title"),
      description: t("features.dreams.description"),
      href: `/${currentLocale}/dreams`,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Calculator,
      title: t("features.numerology.title"),
      description: t("features.numerology.description"),
      href: `/${currentLocale}/numerology`,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Cards,
      title: t("features.tarot.title"),
      description: t("features.tarot.description"),
      href: `/${currentLocale}/tarot`,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Home,
      title: t("features.fengshui.title"),
      description: t("features.fengshui.description"),
      href: `/${currentLocale}/fengshui`,
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Heart,
      title: t("features.compatibility.title"),
      description: t("features.compatibility.description"),
      href: `/${currentLocale}/compatibility`,
      gradient: "from-pink-500 to-red-500",
    },
    {
      icon: Star,
      title: t("features.horoscope.title"),
      description: t("features.horoscope.description"),
      href: `/${currentLocale}/horoscope`,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Eye,
      title: t("features.palmistry.title"),
      description: t("features.palmistry.description"),
      href: `/${currentLocale}/palmistry`,
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: t("features.astrology.title"),
      description: t("features.astrology.description"),
      href: `/${currentLocale}/astrology`,
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Gem,
      title: t("features.crystals.title"),
      description: t("features.crystals.description"),
      href: `/${currentLocale}/crystals`,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Lotus,
      title: t("features.meditation.title"),
      description: t("features.meditation.description"),
      href: `/${currentLocale}/meditation`,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: FileText,
      title: t("features.nameAnalysis.title"),
      description: t("features.nameAnalysis.description"),
      href: `/${currentLocale}/name-analysis`,
      gradient: "from-lime-500 to-green-500",
    },
    {
      icon: Building,
      title: t("features.businessName.title"),
      description: t("features.businessName.description"),
      href: `/${currentLocale}/business-name`,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: t("features.weddingDate.title"),
      description: t("features.weddingDate.description"),
      href: `/${currentLocale}/wedding-date`,
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
            {t("features.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t("site.description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={feature.href}>
                <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
