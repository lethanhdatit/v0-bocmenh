"use client"

import { motion } from "framer-motion"
import { Sparkles, Moon, Calculator, WalletCardsIcon as Cards, Home, Heart } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Sparkles,
      titleKey: "features.destiny.title",
      descriptionKey: "features.destiny.description",
      href: "/destiny",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Moon,
      titleKey: "features.dreams.title",
      descriptionKey: "features.dreams.description",
      href: "/dreams",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Calculator,
      titleKey: "features.numerology.title",
      descriptionKey: "features.numerology.description",
      href: "/numerology",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Cards,
      titleKey: "features.tarot.title",
      descriptionKey: "features.tarot.description",
      href: "/tarot",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Home,
      titleKey: "features.fengshui.title",
      descriptionKey: "features.fengshui.description",
      href: "/fengshui",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: Heart,
      titleKey: "features.compatibility.title",
      descriptionKey: "features.compatibility.description",
      href: "/compatibility",
      gradient: "from-pink-500 to-red-500",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={feature.href}>
                <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {t(feature.titleKey)}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">{t(feature.descriptionKey)}</p>

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
