"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Sparkles, Star } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function LuckyBoxSection() {
  const { t } = useTranslation()
  const [isOpened, setIsOpened] = useState(false)
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null)
  const [message, setMessage] = useState<string>("")

  const messages = useMemo(() => {
    const translatedMessages = t("luckyBox.messages", { returnObjects: true })
    return Array.isArray(translatedMessages) ? translatedMessages : []
  }, [t])

  const openLuckyBox = () => {
    if (isOpened || messages.length === 0) return

    const randomNumber = Math.floor(Math.random() * 99) + 1
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    setLuckyNumber(randomNumber)
    setMessage(randomMessage)
    setIsOpened(true)
  }

  const resetBox = () => {
    setIsOpened(false)
    // Add a small delay to allow the exit animation to complete before clearing the content
    setTimeout(() => {
      setLuckyNumber(null)
      setMessage("")
    }, 300)
  }

  return (
    <section className="py-20 px-4 bg-black">
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

        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                className="absolute cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openLuckyBox}
              >
                <div className="relative">
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
                    className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-3xl blur-xl"
                  />
                  <div className="relative w-64 h-64 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center">
                    <Gift className="w-24 h-24 text-black" />
                    <p className="text-black font-semibold text-lg mt-4">{t("luckyBox.button")}</p>
                  </div>
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
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                className="absolute w-full max-w-md bg-gray-900/80 backdrop-blur-sm border border-yellow-500/50 rounded-3xl p-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <p className="text-sm text-gray-400 mb-2">{t("luckyBox.luckyNumber")}</p>
                  <div className="text-6xl font-bold text-yellow-500 mb-4">{luckyNumber}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <p className="text-sm text-gray-400 mb-2">{t("luckyBox.message")}</p>
                  <p className="text-white text-center leading-relaxed min-h-[48px]">{message}</p>
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
        </div>
      </div>
    </section>
  )
}
