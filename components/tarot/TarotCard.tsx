"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface TarotCardProps {
  card?: {
    id: number
    name: string
    nameVi: string
    image: string
    isReversed?: boolean
    interpretation?: {
      keywords: string[]
      meaning: string
    }
    positionMeaning?: string
  }
  isFlipped: boolean
  onFlip?: () => void
  delay?: number
  size?: "small" | "medium" | "large"
  showBack?: boolean
}

export default function TarotCard({
  card,
  isFlipped,
  onFlip,
  delay = 0,
  size = "medium",
  showBack = true,
}: TarotCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: "w-20 h-32",
    medium: "w-32 h-48",
    large: "w-40 h-60",
  }

  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, delay },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, delay },
    },
  }

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)",
      transition: { duration: 0.3 },
    },
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="perspective-1000 cursor-pointer" onClick={onFlip}>
      <motion.div
        className={`relative ${sizeClasses[size]} preserve-3d`}
        variants={cardVariants}
        animate={isFlipped ? "front" : "back"}
        whileHover="hover"
        initial="rest"
        variants={hoverVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 border-2 border-yellow-500/50 rounded-xl relative overflow-hidden">
            {/* Mystical pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-4 border border-yellow-500/50 rounded-lg">
                <div className="absolute inset-2 border border-yellow-500/30 rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-yellow-500/60 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-yellow-500/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-500 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Center symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-yellow-500 text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                ✦
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Card Front */}
        <motion.div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
          {card ? (
            <div
              className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-yellow-500/70 rounded-xl relative overflow-hidden ${
                card.isReversed ? "rotate-180" : ""
              }`}
            >
              {/* Card image placeholder */}
              <div className="absolute inset-2 bg-gradient-to-br from-purple-200 via-blue-200 to-indigo-200 rounded-lg flex items-center justify-center">
                <div className="text-center p-2">
                  <div className="text-2xl mb-2">🔮</div>
                  <div className="text-xs font-bold text-gray-800">{card.nameVi}</div>
                  <div className="text-xs text-gray-600 mt-1">{card.name}</div>
                </div>
              </div>

              {/* Reversed indicator */}
              {card.isReversed && (
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">R</div>
              )}

              {/* Glow effect when hovered */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-yellow-500/20 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-gray-500 rounded-xl flex items-center justify-center">
              <div className="text-gray-600 text-center">
                <div className="text-2xl mb-2">?</div>
                <div className="text-xs">Chọn lá bài</div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
