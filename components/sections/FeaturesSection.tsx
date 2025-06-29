"use client"

import { motion } from "framer-motion"
import { Sparkles, Moon, Calculator, Heart, Home } from "lucide-react"
import { GiCardRandom } from "react-icons/gi"
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
    },
    { icon: Moon, titleKey: "features.dreams.title", descriptionKey: "features.dreams.description", href: "/dreams" },
    {
      icon: Calculator,
      titleKey: "features.numerology.title",
      descriptionKey: "features.numerology.description",
      href: "/numerology",
    },
    {
      icon: GiCardRandom,
      titleKey: "features.tarot.title",
      descriptionKey: "features.tarot.description",
      href: "/tarot",
    },
    {
      icon: Home,
      titleKey: "features.fengshui.title",
      descriptionKey: "features.fengshui.description",
      href: "/fengshui",
    },
    {
      icon: Heart,
      titleKey: "features.compatibility.title",
      descriptionKey: "features.compatibility.description",
      href: "/compatibility",
    },
  ]

  return (
    <section id="features-section" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 font-serif"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-secondary">{t("features.title")}</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">{t("site.description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={feature.href} className="block h-full group">
                <div className="relative bg-card border border-border rounded-xl p-8 h-full transition-all duration-300 hover:border-primary/50 hover:bg-card/90 hover:-translate-y-2 shadow-sm hover:shadow-lg hover:shadow-primary/10">
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div
                      className="w-full h-full"
                      style={{ background: `url(/imgs/oriental-pattern-dark.png)`, backgroundSize: "100px" }}
                    />
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6 ring-1 ring-border group-hover:ring-secondary transition-all duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 font-serif group-hover:text-secondary transition-colors">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-sans">{t(feature.descriptionKey)}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
