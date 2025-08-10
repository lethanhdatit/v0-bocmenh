"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ComingSoonBadge, MaintenanceBadge } from "@/components/features/ComingSoonBadge";

interface LuckyBoxProps {
  isOpened: boolean;
  isLoading: boolean;
  isDisabled?: boolean;
  showComingSoonBadge?: boolean;
  showMaintenanceBadge?: boolean;
  onBoxClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LuckyBox({
  isOpened,
  isLoading,
  isDisabled = false,
  showComingSoonBadge = false,
  showMaintenanceBadge = false,
  onBoxClick,
  className = "",
  size = 'md'
}: LuckyBoxProps) {
  const { t } = useTranslation();

  // Responsive sizes based on size prop
  const sizeConfig = {
    sm: {
      container: "w-48 h-48 sm:w-56 sm:h-56", // 192px -> 224px
      box: "w-40 h-40 sm:w-48 sm:h-48", // 160px -> 192px
      icon: "w-16 h-16 sm:w-20 sm:h-20", // 64px -> 80px
      padding: "p-4 sm:p-6",
      fontSize: "text-sm sm:text-base",
      floatingIcon: "w-6 h-6 sm:w-8 sm:h-8",
      floatingIconSmall: "w-5 h-5 sm:w-6 sm:h-6"
    },
    md: {
      container: "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72", // 224px -> 256px -> 288px
      box: "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64", // 192px -> 224px -> 256px
      icon: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28", // 80px -> 96px -> 112px
      padding: "p-6 sm:p-7 md:p-8",
      fontSize: "text-base sm:text-lg md:text-lg",
      floatingIcon: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10",
      floatingIconSmall: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
    },
    lg: {
      container: "w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96", // 256px -> 288px -> 320px -> 384px
      box: "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80", // 224px -> 256px -> 288px -> 320px
      icon: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36", // 96px -> 112px -> 128px -> 144px
      padding: "p-6 sm:p-7 md:p-8 lg:p-10",
      fontSize: "text-lg sm:text-xl md:text-xl lg:text-2xl",
      floatingIcon: "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12",
      floatingIconSmall: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
    }
  };

  const config = sizeConfig[size];

  if (isOpened) return null;

  return (
    <motion.div
      key="box"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      className={`relative cursor-pointer ${className}`}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      onClick={() => {
        if (!isDisabled) {
          onBoxClick();
        }
      }}
      style={{ 
        willChange: 'transform',
        transformOrigin: 'center'
      }}
    >
      <div className={`relative ${isDisabled ? "pointer-events-none cursor-not-allowed" : ""} ${config.container} mx-auto`}>
        {/* Mystical Aura - responsive inset */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-yellow-500/40 via-amber-500/40 to-orange-500/40 rounded-full blur-xl sm:blur-2xl"
          style={{ 
            willChange: 'transform, opacity',
            transformOrigin: 'center',
            contain: 'layout style paint'
          }}
        />

        {/* Sacred Geometry - responsive inset */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -inset-3 sm:-inset-4 md:-inset-6 border-2 border-yellow-400/40 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -inset-2 sm:-inset-3 md:-inset-4 border border-amber-400/30 rounded-full"
        />

        {/* Main Box - responsive size */}
        <div className={`relative ${config.box} bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl ${config.padding} shadow-2xl border border-yellow-400/50 flex flex-col items-center justify-center mx-auto`}>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
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
            style={{ 
              willChange: 'transform, filter',
              transformOrigin: 'center'
            }}
          >
            <Gift className={`${config.icon} text-white drop-shadow-lg`} />
          </motion.div>
          <p className={`text-white font-semibold ${config.fontSize} mt-2 sm:mt-3 md:mt-4 tracking-wide drop-shadow-md text-center`}>
            {isLoading ? t("luckyBox.opening") : t("luckyBox.button")}
          </p>
        </div>

        {/* Status Badge overlay for the box itself */}
        {showComingSoonBadge && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <ComingSoonBadge variant="corner" size="xs" />
          </div>
        )}
        {showMaintenanceBadge && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <MaintenanceBadge variant="corner" size="xs" />
          </div>
        )}

        {/* Floating Elements - responsive positioning and size */}
        <motion.div
          animate={{ rotate: 360, y: [-3, 3, -3] }}
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
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6"
        >
          <Sparkles className={`${config.floatingIcon} text-yellow-400 drop-shadow-lg`} />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, y: [3, -3, 3] }}
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
          className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6"
        >
          <Star className={`${config.floatingIconSmall} text-amber-400 drop-shadow-lg`} />
        </motion.div>
      </div>
    </motion.div>
  );
}
