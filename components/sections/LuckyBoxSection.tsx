"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiClient } from "@/lib/api/apiClient";

export default function LuckyBoxSection() {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const openLuckyBox = async () => {
    if (isOpened || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await getLuckyBox();

      if (response.success && response.data) {
        const {
          luckyNumber: num,
          messageIndex,
          isFirstTime: firstTime,
        } = response.data;

        // Get messages from translation
        const translatedMessages = t("luckyBox.messages", {
          returnObjects: true,
        });
        const messageArray = Array.isArray(translatedMessages)
          ? translatedMessages
          : [];

        const selectedMessage =
          messageArray[messageIndex % messageArray.length];

        setLuckyNumber(num);
        setMessage(selectedMessage || messageArray[0]);
        setIsFirstTime(firstTime);
        setIsOpened(true);

        if (!firstTime) {
          setStatusMessage(t("luckyBox.alreadyOpened"));
        }
      } else {
        throw new Error(response.message || "Failed to get lucky box result");
      }
    } catch (error) {
      console.error("Lucky box error:", error);
      setStatusMessage("Không thể mở hộp may mắn. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetBox = () => {
    setIsOpened(false);
    // Add a small delay to allow the exit animation to complete before clearing the content
    setTimeout(() => {
      setLuckyNumber(null);
      setMessage("");
      setIsFirstTime(true);
      setStatusMessage("");
    }, 300);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent  tracking-wide">
            {t("luckyBox.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light italic">
            {t("luckyBox.description")}
          </p>
        </motion.div>

        <div
          id="luckybox-section"
          className="relative h-96 flex items-center justify-center"
        >
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
                onClick={() => {
                  openLuckyBox();
                }}
              >
                <div className="relative">
                  {/* Mystical Aura */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-8 bg-gradient-to-r from-yellow-500/40 via-amber-500/40 to-orange-500/40 rounded-full blur-2xl"
                  />

                  {/* Sacred Geometry */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute -inset-6 border-2 border-yellow-400/40 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="absolute -inset-4 border border-amber-400/30 rounded-full"
                  />

                  {/* Main Box */}
                  <div className="relative w-72 h-72 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-8 shadow-2xl border border-yellow-400/50 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        filter: [
                          "hue-rotate(0deg)",
                          "hue-rotate(15deg)",
                          "hue-rotate(0deg)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Gift className="w-28 h-28 text-white drop-shadow-lg" />
                    </motion.div>
                    <p className="text-white font-semibold text-lg mt-4 tracking-wide drop-shadow-md">
                      {isLoading ? "Đang mở..." : t("luckyBox.button")}
                    </p>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ rotate: 360, y: [-5, 5, -5] }}
                    transition={{
                      rotate: {
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      },
                      y: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute -top-6 -right-6"
                  >
                    <Sparkles className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360, y: [5, -5, 5] }}
                    transition={{
                      rotate: {
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      },
                      y: {
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute -bottom-6 -left-6"
                  >
                    <Star className="w-8 h-8 text-amber-400 drop-shadow-lg" />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                className="absolute w-full max-w-2xl bg-gradient-to-br from-gray-900/90 via-purple-900/50 to-gray-900/90 backdrop-blur-lg border border-purple-400/30 rounded-3xl p-8 shadow-2xl"
              >
                {/* Mystical Border Animation */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(0deg, rgba(168, 85, 247, 0.3), rgba(251, 191, 36, 0.3))",
                      "linear-gradient(90deg, rgba(168, 85, 247, 0.3), rgba(251, 191, 36, 0.3))",
                      "linear-gradient(180deg, rgba(168, 85, 247, 0.3), rgba(251, 191, 36, 0.3))",
                      "linear-gradient(270deg, rgba(168, 85, 247, 0.3), rgba(251, 191, 36, 0.3))",
                      "linear-gradient(360deg, rgba(168, 85, 247, 0.3), rgba(251, 191, 36, 0.3))",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-3xl opacity-50 blur-sm"
                />

                {/* Focus Animation & Status Message */}
                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                        },
                      }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="mb-6 p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl relative overflow-hidden"
                    >
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(251, 146, 60, 0.4)",
                            "0 0 0 15px rgba(251, 146, 60, 0)",
                            "0 0 0 0 rgba(251, 146, 60, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: 2,
                          ease: "easeInOut",
                        }}
                        className="text-orange-200 text-sm text-center font-medium "
                      >
                        {statusMessage}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <p className="text-sm text-purple-300 mb-3  tracking-wide">
                    {t("luckyBox.luckyNumber")}
                  </p>
                  <motion.div
                    className="text-7xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6 "
                    animate={
                      statusMessage
                        ? {
                            scale: [1, 1.15, 1],
                            filter: [
                              "drop-shadow(0 0 10px rgba(234, 179, 8, 0.5))",
                              "drop-shadow(0 0 25px rgba(234, 179, 8, 0.8))",
                              "drop-shadow(0 0 10px rgba(234, 179, 8, 0.5))",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: statusMessage ? 2 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {luckyNumber}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <p className="text-sm text-purple-300 mb-4  tracking-wide text-center">
                    {t("luckyBox.message")}
                  </p>
                  <motion.div
                    className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-xl p-6 border border-purple-400/20"
                    animate={
                      statusMessage
                        ? {
                            scale: [1, 1.02, 1],
                            boxShadow: [
                              "0 0 20px rgba(168, 85, 247, 0.2)",
                              "0 0 40px rgba(168, 85, 247, 0.4)",
                              "0 0 20px rgba(168, 85, 247, 0.2)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: statusMessage ? 1 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.p
                      className="text-gray-100 text-center leading-relaxed text-base font-light tracking-wide min-h-[120px] flex items-center justify-center"
                      animate={
                        statusMessage
                          ? {
                              color: ["#f3f4f6", "#fde047", "#f3f4f6"],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: statusMessage ? 1 : 0,
                        ease: "easeInOut",
                      }}
                    >
                      {message}
                    </motion.p>
                  </motion.div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={resetBox}
                  className="mt-8 text-purple-400 hover:text-purple-300 transition-colors text-sm tracking-wide mx-auto block relative z-10 cursor-pointer"
                >
                  {isFirstTime ? t("luckyBox.tryAgain") : "Xem lại"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

async function getLuckyBox(): Promise<any> {
  try {
    const response = await apiClient.get("/lucky-box");
    return response.data;
  } catch (error) {
    throw error;
  }
}
