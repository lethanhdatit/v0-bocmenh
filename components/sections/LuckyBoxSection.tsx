"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { apiClient } from "@/lib/api/apiClient";
import { isFeatureComingSoon, isFeatureMaintenance } from "@/lib/features/feature-flags";
import LuckyBox from "@/components/common/LuckyBox";

export default function LuckyBoxSection() {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Feature flags check
  const isLuckyBoxComingSoon = isFeatureComingSoon('/luckybox');
  const isLuckyBoxMaintenance = isFeatureMaintenance('/luckybox');
  const isLuckyBoxDisabled = isLuckyBoxComingSoon || isLuckyBoxMaintenance;

  const openLuckyBox = async () => {
    if (isOpened || isLoading || isLuckyBoxDisabled) {
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
        {/* Section header with status badge */}
        <div className="relative">
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

          {/* Status message for section header */}
          {(isLuckyBoxComingSoon || isLuckyBoxMaintenance) && (
            <div className="flex justify-center mt-4 mb-8">
              <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-yellow-400/30">
                <span className="text-yellow-300 text-sm font-medium">
                  {isLuckyBoxComingSoon ? t("comingSoon.title") : t("maintenance.title")}
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          id="luckybox-section"
          className={`relative ${isOpened ? 'min-h-[500px] sm:min-h-[550px] md:min-h-[600px]' : 'min-h-[280px] sm:min-h-[320px] md:min-h-[400px]'} flex items-center justify-center px-4 transition-all duration-500 ${
            isLuckyBoxDisabled ? "opacity-60" : "opacity-100"
          }`}
          style={{ contain: 'layout style' }}
        >
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <LuckyBox
                isOpened={isOpened}
                isLoading={isLoading}
                isDisabled={isLuckyBoxDisabled}
                showComingSoonBadge={isLuckyBoxComingSoon}
                showMaintenanceBadge={isLuckyBoxMaintenance}
                onBoxClick={openLuckyBox}
                size="md"
              />
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
                className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900/90 via-purple-900/50 to-gray-900/90 backdrop-blur-lg border border-purple-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
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
                      className="mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-500/20 border border-orange-500/50 rounded-lg sm:rounded-xl relative overflow-hidden"
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
                    className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4 sm:mb-6"
                    animate={
                      statusMessage
                        ? {
                            scale: [1, 1.08, 1],
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
                    style={{ 
                      willChange: statusMessage ? 'transform, filter' : 'auto',
                      transformOrigin: 'center'
                    }}
                  >
                    {luckyNumber}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 sm:mt-8"
                >
                  <p className="text-xs sm:text-sm text-purple-300 mb-3 sm:mb-4 tracking-wide text-center">
                    {t("luckyBox.message")}
                  </p>
                  <motion.div
                    className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-400/20"
                    animate={
                      statusMessage
                        ? {
                            scale: [1, 1.01, 1],
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
                    style={{ 
                      willChange: statusMessage ? 'transform, box-shadow' : 'auto',
                      transformOrigin: 'center'
                    }}
                  >
                    <motion.p
                      className="text-gray-100 text-center leading-relaxed text-sm sm:text-base font-light tracking-wide min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center"
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
                  className="mt-6 sm:mt-8 text-purple-400 hover:text-purple-300 transition-colors text-sm sm:text-base tracking-wide mx-auto block relative z-10 cursor-pointer px-4 py-2"
                >
                  {isFirstTime ? t("luckyBox.tryAgain") : t("luckyBox.viewAgain")}
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
