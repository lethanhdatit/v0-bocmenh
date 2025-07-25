'use client';

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ScrollToTopButton() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleScroll = useCallback(() => {
    setShow(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
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
  );
}