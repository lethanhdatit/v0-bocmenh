"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Sparkles, Star } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function LuckyBoxSection() {
  const { t } = useLanguage()
  const [isOpened, setIsOpened] = useState(false)
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null)
  const [message, setMessage] = useState<string>("")

  const messages = {
    vi: [
      "Hôm nay là ngày tuyệt vời để bắt đầu điều gì đó mới!",
      "Hãy tin tưởng vào trực giác của bạn.",
      "Cơ hội đang chờ đợi bạn ở phía trước.",
      "Hãy mở lòng đón nhận những điều tốt đẹp.",
      "Sự kiên nhẫn sẽ mang lại kết quả ngọt ngào.",
    ],
    en: [
      "Today is a great day to start something new!",
      "Trust your intuition.",
      "Opportunities are waiting for you ahead.",
      "Open your heart to receive good things.",
      "Patience will bring sweet results.",
    ],
  }

  const openLuckyBox = () => {
    if (isOpened) return

    const randomNumber = Math.floor(Math.random() * 99) + 1
    const randomMessage =
      messages[t("common.loading") === "Loading..." ? "en" : "vi"][Math.floor(Math.random() * messages.vi.length)]

    setLuckyNumber(randomNumber)
    setMessage(randomMessage)
    setIsOpened(true)
  }

  const resetBox = () => {
    setIsOpened(false)
    setLuckyNumber(null)
    setMessage("")
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
            {t("luckyBox.title")}
          </h2>
          <p className="text-xl text-gray-400 mb-12">{t("luckyBox.description")}</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="mx-auto w-64 h-64 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openLuckyBox}
          >
            <AnimatePresence mode="wait">
              {!isOpened ? (
                <motion.div
                  key="box"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  {/* Glowing effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-3xl blur-xl"
                  />

                  {/* Box */}
                  <div className="relative bg-gradient-to-br from-yellow-500 to-amber-500 rounded-3xl p-8 shadow-2xl">
                    <Gift className="w-24 h-24 text-black mx-auto mb-4" />
                    <p className="text-black font-semibold text-lg">{t("luckyBox.button")}</p>
                  </div>

                  {/* Floating sparkles */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -top-4 -right-4"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -bottom-4 -left-4"
                  >
                    <Star className="w-6 h-6 text-amber-500" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-900/80 backdrop-blur-sm border border-yellow-500/50 rounded-3xl p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <div className="text-6xl font-bold text-yellow-500 mb-4">{luckyNumber}</div>
                    <p className="text-sm text-gray-400 mb-2">{t("luckyBox.luckyNumber")}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <p className="text-sm text-gray-400 mb-2">{t("luckyBox.message")}</p>
                    <p className="text-white text-center leading-relaxed">{message}</p>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={resetBox}
                    className="mt-6 text-yellow-500 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {t("luckyBox.tryAgain")}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
