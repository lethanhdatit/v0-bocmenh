"use client"

import { motion } from "framer-motion"
import { Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated lotus background */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-20">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-64 h-64 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Floating stars */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-10 -left-10"
        >
          <Star className="w-6 h-6 text-yellow-500" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-5 -right-5"
        >
          <Sparkles className="w-8 h-8 text-amber-500" />
        </motion.div>

        {/* Main content */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              href="/destiny"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t("hero.cta")}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
