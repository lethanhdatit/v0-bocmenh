"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Home, Calendar, Coins, Heart, Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FengShuiPageClient({ translations }: { translations: any }) {
  const [activeTab, setActiveTab] = useState("overview")
  const params = useParams()
  const locale = params.locale as string

  const fengShuiTools = [
    {
      id: "kua-number",
      title: translations("tools.kuaNumber.title"),
      description: translations("tools.kuaNumber.description"),
      icon: Compass,
      href: `/${locale}/fengshui/kua-number`,
      color: "from-red-500 to-orange-500",
    },
    {
      id: "house-direction",
      title: translations("tools.houseDirection.title"),
      description: translations("tools.houseDirection.description"),
      icon: Home,
      href: `/${locale}/fengshui/house-direction`,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "flying-stars",
      title: translations("tools.flyingStars.title"),
      description: translations("tools.flyingStars.description"),
      icon: Star,
      href: `/${locale}/fengshui/flying-stars`,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "wealth-corner",
      title: translations("tools.wealthCorner.title"),
      description: translations("tools.wealthCorner.description"),
      icon: Coins,
      href: `/${locale}/fengshui/wealth-corner`,
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: "love-corner",
      title: translations("tools.loveCorner.title"),
      description: translations("tools.loveCorner.description"),
      icon: Heart,
      href: `/${locale}/fengshui/love-corner`,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "calendar",
      title: translations("tools.calendar.title"),
      description: translations("tools.calendar.description"),
      icon: Calendar,
      href: `/${locale}/fengshui/calendar`,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const elements = [
    {
      name: translations("elements.metal.name"),
      color: "text-gray-300",
      bgColor: "bg-gray-100",
      description: translations("elements.metal.description"),
      direction: translations("elements.metal.direction"),
      icon: "⚪",
    },
    {
      name: translations("elements.wood.name"),
      color: "text-green-500",
      bgColor: "bg-green-100",
      description: translations("elements.wood.description"),
      direction: translations("elements.wood.direction"),
      icon: "🌳",
    },
    {
      name: translations("elements.water.name"),
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      description: translations("elements.water.description"),
      direction: translations("elements.water.direction"),
      icon: "💧",
    },
    {
      name: translations("elements.fire.name"),
      color: "text-red-500",
      bgColor: "bg-red-100",
      description: translations("elements.fire.description"),
      direction: translations("elements.fire.direction"),
      icon: "🔥",
    },
    {
      name: translations("elements.earth.name"),
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: translations("elements.earth.description"),
      direction: translations("elements.earth.direction"),
      icon: "🏔️",
    },
  ]

  const tips = [
    {
      title: translations("tips.mainDoor.title"),
      content: translations("tips.mainDoor.content"),
      icon: "🚪",
    },
    {
      title: translations("tips.bedroom.title"),
      content: translations("tips.bedroom.content"),
      icon: "🛏️",
    },
    {
      title: translations("tips.kitchen.title"),
      content: translations("tips.kitchen.content"),
      icon: "🍳",
    },
    {
      title: translations("tips.office.title"),
      content: translations("tips.office.content"),
      icon: "💼",
    },
    {
      title: translations("tips.plants.title"),
      content: translations("tips.plants.content"),
      icon: "🌱",
    },
    {
      title: translations("tips.lighting.title"),
      content: translations("tips.lighting.content"),
      icon: "💡",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              {translations("title")}
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">{translations("subtitle")}</p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/20 backdrop-blur-md rounded-full p-1">
              {[
                { id: "overview", label: translations("tabs.overview") },
                { id: "tools", label: translations("tabs.tools") },
                { id: "elements", label: translations("tabs.elements") },
                { id: "tips", label: translations("tabs.tips") },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeTab === tab.id ? "bg-emerald-500 text-white shadow-lg" : "text-emerald-200 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-4">{translations("overview.what.title")}</h2>
                  <p className="text-emerald-100 mb-4">{translations("overview.what.content1")}</p>
                  <p className="text-emerald-100">{translations("overview.what.content2")}</p>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-4">
                    {translations("overview.principles.title")}
                  </h2>
                  <ul className="space-y-3 text-emerald-100">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>{translations("overview.principles.yinYang.title")}:</strong>{" "}
                        {translations("overview.principles.yinYang.description")}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>{translations("overview.principles.fiveElements.title")}:</strong>{" "}
                        {translations("overview.principles.fiveElements.description")}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>{translations("overview.principles.bagua.title")}:</strong>{" "}
                        {translations("overview.principles.bagua.description")}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>{translations("overview.principles.qi.title")}:</strong>{" "}
                        {translations("overview.principles.qi.description")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fengShuiTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={tool.href}>
                      <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">{tool.title}</h3>
                        <p className="text-emerald-100">{tool.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "elements" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elements.map((element, index) => (
                  <motion.div
                    key={element.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{element.icon}</div>
                      <h3 className={`text-2xl font-bold ${element.color}`}>{element.name}</h3>
                    </div>
                    <div className="space-y-2 text-emerald-100">
                      <p>
                        <strong>{translations("elements.characteristics")}:</strong> {element.description}
                      </p>
                      <p>
                        <strong>{translations("elements.direction")}:</strong> {element.direction}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "tips" && (
              <div className="grid md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{tip.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">{tip.title}</h3>
                        <p className="text-emerald-100">{tip.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">{translations("cta.title")}</h2>
              <p className="text-emerald-100 mb-6">{translations("cta.description")}</p>
              <Link
                href={`/${locale}/fengshui/kua-number`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                <span>{translations("cta.button")}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
