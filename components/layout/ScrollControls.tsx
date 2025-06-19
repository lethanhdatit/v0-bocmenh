"use client";

import { useRef } from "react";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp, Compass, X, Info, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"; // Sử dụng Button component có sẵn

interface TourStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

const tourSteps: TourStep[] = [
  // {
  //   id: "hero-section",
  //   titleKey: "tour.hero.title",
  //   descriptionKey: "tour.hero.description",
  // },
  {
    id: "features-section",
    titleKey: "tour.features.title",
    descriptionKey: "tour.features.description",
  },
  {
    id: "luckybox-section",
    titleKey: "tour.luckybox.title",
    descriptionKey: "tour.luckybox.description",
  },
  {
    id: "featured-products-section",
    titleKey: "tour.featuredProducts.title",
    descriptionKey: "tour.featuredProducts.description",
  },
];

export default function ScrollControls() {
  const { t } = useTranslation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [showTourTooltip, setShowTourTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({
    title: "",
    description: "",
  });

  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return new Promise((resolve) => setTimeout(resolve, 800)); // Đợi cuộn xong
    }
    return Promise.reject();
  };

  const processTourStep = async (stepIndex: number) => {
    if (stepIndex >= tourSteps.length) {
      stopTour();
      return;
    }

    setShowTourTooltip(false); // Ẩn tooltip cũ
    const step = tourSteps[stepIndex];
    setCurrentTourStep(stepIndex);

    try {
      await scrollToSection(step.id);
      if (!isTourActiveRef.current) return; // Kiểm tra nếu tour đã bị dừng

      setTooltipContent({
        title: t(step.titleKey),
        description: t(step.descriptionKey),
      });
      setShowTourTooltip(true);

      // Tự động chuyển sau 5 giây, hoặc khi người dùng click "Next"
      // Hiện tại chỉ tự động chuyển
      const timeoutId = setTimeout(() => {
        if (isTourActiveRef.current) {
          // Kiểm tra lại trước khi xử lý bước tiếp theo
          processTourStep(stepIndex + 1);
        }
      }, 5000); // 5 giây hiển thị tooltip

      // Lưu timeoutId để có thể clear nếu tour bị dừng
      currentTimeoutIdRef.current = timeoutId;
    } catch (error) {
      console.warn("Tour: Section not found or scroll failed", step.id);
      stopTour(); // Dừng tour nếu có lỗi
    }
  };

  // Refs để giữ giá trị mới nhất của state trong các closure của setTimeout
  const isTourActiveRef = useRef(isTourActive);
  const currentTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isTourActiveRef.current = isTourActive;
  }, [isTourActive]);

  const startTour = () => {
    setIsTourActive(true);
    setShowScrollToTop(false); // Ẩn nút scroll to top khi tour chạy
    processTourStep(0);
  };

  const stopTour = () => {
    setIsTourActive(false);
    setShowTourTooltip(false);
    setCurrentTourStep(0);
    if (currentTimeoutIdRef.current) {
      clearTimeout(currentTimeoutIdRef.current);
      currentTimeoutIdRef.current = null;
    }
  };

  return (
    <>
      {/* Nút Scroll to Top */}
      <AnimatePresence>
        {showScrollToTop && !isTourActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 right-4 z-50 mb-2"
          >
            <Button
              variant="default"
              size="icon"
              className="mystical-button rounded-full shadow-lg w-12 h-12"
              onClick={scrollToTop}
              aria-label={t("scroll.toTop")}
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút Take Scroll Tour / Stop Tour */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="default"
          size="icon"
          className="mystical-button rounded-full shadow-lg w-12 h-12"
          onClick={isTourActive ? stopTour : startTour}
          aria-label={isTourActive ? t("tour.stop") : t("tour.start")}
        >
          {isTourActive ? (
            <X className="h-6 w-6" />
          ) : (
            // <Compass className="h-6 w-6" />
             <Info className="h-6 w-6" />
            // <Play className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Tooltip/Modal cho Scroll Tour */}
      <AnimatePresence>
        {isTourActive && showTourTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-[60] p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              // Chỉ đóng khi click vào backdrop, không phải content
              if (e.target === e.currentTarget) {
                // Hiện tại không cho phép đóng bằng click backdrop để tránh miss-click
                // Nếu muốn, có thể thêm stopTour() ở đây
              }
            }}
          >
            <div className="mystical-card max-w-md w-full p-6 relative text-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-400 hover:text-yellow-500"
                onClick={stopTour}
                aria-label={t("tour.skip")}
              >
                <X className="h-5 w-5" />
              </Button>
              {/* <div className="flex justify-center mb-3">
                <Info className="w-8 h-8 text-yellow-500" />
              </div> */}
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                {tooltipContent.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {tooltipContent.description}
              </p>
              <div className="text-xs text-gray-500">
                {t("tour.autoNext", { count: 5 - (currentTourStep + 1) * 0 })}{" "}
                {/* Logic count cần review */}
              </div>
              <div className="flex justify-center mt-4 space-x-3">
                <Button
                  onClick={stopTour}
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                >
                  {t("tour.skipAll")}
                </Button>
                {currentTourStep < tourSteps.length - 1 && (
                  <Button
                    onClick={() => {
                      if (currentTimeoutIdRef.current)
                        clearTimeout(currentTimeoutIdRef.current);
                      processTourStep(currentTourStep + 1);
                    }}
                    className="mystical-button"
                  >
                    {t("tour.nextStep")}
                  </Button>
                )}
              </div>
              {/* Progress dots */}
              <div className="flex justify-center space-x-2 mt-5">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentTourStep
                        ? "bg-yellow-500 scale-125"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
