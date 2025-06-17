"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PalmistryForm from "@/components/forms/PalmistryForm"
import type { PalmReading } from "@/lib/palmistry"

export default function PalmistryPageClient({ translations }: { translations: any }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [analysis, setAnalysis] = useState<PalmReading | null>(null)

  const tabs = [
    { id: "overview", label: translations("tabs.overview"), icon: "🖐️" },
    { id: "lines", label: translations("tabs.lines"), icon: "📏" },
    { id: "types", label: translations("tabs.types"), icon: "✋" },
    { id: "analyze", label: translations("tabs.analyze"), icon: "🔮" },
  ]

  const majorLines = [
    {
      name: translations("lines.life.name"),
      icon: "📏",
      description: translations("lines.life.description"),
      color: "text-green-400",
    },
    {
      name: translations("lines.heart.name"),
      icon: "💖",
      description: translations("lines.heart.description"),
      color: "text-pink-400",
    },
    {
      name: translations("lines.head.name"),
      icon: "🧠",
      description: translations("lines.head.description"),
      color: "text-blue-400",
    },
    {
      name: translations("lines.fate.name"),
      icon: "🌟",
      description: translations("lines.fate.description"),
      color: "text-yellow-400",
    },
  ]

  const handTypes = [
    {
      name: translations("handTypes.earth.name"),
      element: "🌍",
      traits: translations("handTypes.earth.traits"),
      careers: translations("handTypes.earth.careers"),
    },
    {
      name: translations("handTypes.air.name"),
      element: "💨",
      traits: translations("handTypes.air.traits"),
      careers: translations("handTypes.air.careers"),
    },
    {
      name: translations("handTypes.fire.name"),
      element: "🔥",
      traits: translations("handTypes.fire.traits"),
      careers: translations("handTypes.fire.careers"),
    },
    {
      name: translations("handTypes.water.name"),
      element: "💧",
      traits: translations("handTypes.water.traits"),
      careers: translations("handTypes.water.careers"),
    },
  ]

  const handleAnalysis = (newAnalysis: PalmReading) => {
    setAnalysis(newAnalysis)
    setActiveTab("analyze")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              rotate: 360,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {["🖐️", "✋", "🤚", "👋", "🙏"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">🖐️ {translations("title")}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{translations("subtitle")}</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id ? "bg-white text-purple-900" : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  {translations("overview.what.title")}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      🔮 {translations("overview.ancient.title")}
                    </h3>
                    <p className="text-white/80 leading-relaxed">{translations("overview.ancient.content")}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      📚 {translations("overview.benefits.title")}
                    </h3>
                    <ul className="text-white/80 space-y-2">
                      <li>• {translations("overview.benefits.personality")}</li>
                      <li>• {translations("overview.benefits.potential")}</li>
                      <li>• {translations("overview.benefits.career")}</li>
                      <li>• {translations("overview.benefits.relationships")}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("analyze")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  🔮 {translations("overview.cta")}
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === "lines" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">{translations("lines.title")}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {majorLines.map((line, index) => (
                  <motion.div
                    key={line.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{line.icon}</span>
                      <h3 className={`text-xl font-bold ${line.color}`}>{line.name}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">{line.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "types" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">{translations("handTypes.title")}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {handTypes.map((type, index) => (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{type.element}</span>
                      <h3 className="text-xl font-bold text-white">{type.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-purple-300 font-medium">{translations("handTypes.traits")}: </span>
                        <span className="text-white/80">{type.traits}</span>
                      </div>
                      <div>
                        <span className="text-blue-300 font-medium">{translations("handTypes.careers")}: </span>
                        <span className="text-white/80">{type.careers}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analyze" && (
            <div className="max-w-4xl mx-auto">
              {!analysis ? (
                <PalmistryForm onAnalysis={handleAnalysis} />
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  {/* Hand Type */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      🖐️ {translations("results.handType.title")}
                    </h3>
                    <div className="text-center mb-6">
                      <h4 className="text-3xl font-bold text-purple-300 mb-2">{analysis.handType.name}</h4>
                      <p className="text-white/80 text-lg">{analysis.handType.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg font-semibold text-pink-300 mb-3">
                          {translations("results.personality")}
                        </h5>
                        <ul className="text-white/80 space-y-1">
                          {analysis.handType.personality.map((trait, index) => (
                            <li key={index}>• {trait}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold text-blue-300 mb-3">{translations("results.career")}</h5>
                        <ul className="text-white/80 space-y-1">
                          {analysis.handType.career.map((career, index) => (
                            <li key={index}>• {career}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Lines Analysis */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      📏 {translations("results.lines.title")}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(analysis.lines).map(([key, line]) => (
                        <div key={key} className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-lg font-semibold text-white mb-2">{line.name}</h4>
                          <p className="text-white/70 text-sm mb-3">{line.description}</p>
                          <p className="text-white/80">
                            <span className="font-medium">{translations("results.meaning")}: </span>
                            {line.meaning}
                          </p>
                          <div className="mt-3">
                            <span className="text-purple-300 font-medium">
                              {translations("results.characteristics")}:{" "}
                            </span>
                            <span className="text-white/80">{line.characteristics.join(", ")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overall Analysis */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      🔮 {translations("results.overall.title")}
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed mb-6">{analysis.overall}</p>
                    <div>
                      <h4 className="text-xl font-semibold text-yellow-300 mb-4">
                        💡 {translations("results.advice.title")}
                      </h4>
                      <ul className="text-white/80 space-y-2">
                        {analysis.advice.map((advice, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            {advice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* New Analysis Button */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAnalysis(null)}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      🔄 {translations("results.newAnalysis")}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
