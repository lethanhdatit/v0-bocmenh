"use client";

import { Suspense } from "react";
import LuckyBoxSection from "@/components/sections/LuckyBoxSection";
import { useTranslation } from "react-i18next";

export default function LuckyBoxPageClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900">     
      {/* Lucky Box Section */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        }
      >
        <LuckyBoxSection />
      </Suspense>

      {/* Additional Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-yellow-400">
                {t("luckyBox.page.howItWorks.title")}
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mt-1">
                    1
                  </div>
                  <p>{t("luckyBox.page.howItWorks.step1")}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mt-1">
                    2
                  </div>
                  <p>{t("luckyBox.page.howItWorks.step2")}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mt-1">
                    3
                  </div>
                  <p>{t("luckyBox.page.howItWorks.step3")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-yellow-400">
                {t("luckyBox.page.specialMeaning.title")}
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>{t("luckyBox.page.specialMeaning.description1")}</p>
                <p>{t("luckyBox.page.specialMeaning.description2")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
