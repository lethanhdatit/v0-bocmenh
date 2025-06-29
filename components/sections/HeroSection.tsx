"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import Image from "next/image"

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="hero-section"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden text-center px-4"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 opacity-20"
          >
            <Image src="/imgs/zodiac-wheel.png" alt="Zodiac Wheel" layout="fill" priority />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 opacity-20"
          >
            <Image src="/imgs/bagua-wheel.png" alt="Ba Gua Wheel" layout="fill" priority />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 font-serif">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-secondary"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/destiny"
            className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-full shadow-lg shadow-secondary/20 transition-all duration-300 hover:bg-secondary/90 hover:shadow-secondary/40 transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t("hero.cta")}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
