"use client";

import { Gift, BarChart3, Info, Sparkles, LockKeyhole } from "lucide-react";
import {
  TuTruAnalysisResult,
  FiveElementsAnalysis,
  GodInfo,
  FengShuiItem,
} from "./types";
import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";

// Màu sắc cho ngũ hành
const ELEMENT_COLORS: Record<string, string> = {
  Kim: "bg-gradient-to-br from-yellow-400 to-gray-300 text-yellow-900",
  Mộc: "bg-gradient-to-br from-green-400 to-green-700 text-green-900",
  Thủy: "bg-gradient-to-br from-blue-400 to-blue-700 text-blue-900",
  Hỏa: "bg-gradient-to-br from-red-400 to-orange-500 text-red-900",
  Thổ: "bg-gradient-to-br from-yellow-700 to-yellow-500 text-yellow-100",
};

function ElementTag({
  element,
  children,
}: {
  element: string;
  children?: React.ReactNode;
}) {
  const colorKey =
    typeof element === "string" && element.length > 0
      ? element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
      : "";
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded font-semibold mr-1 mb-1 text-xs ${
        ELEMENT_COLORS[colorKey] || "bg-gray-200 text-gray-800"
      }`}
    >
      {children ?? element}
    </span>
  );
}

function FiveElementsBarChart({
  analysis,
}: {
  analysis: FiveElementsAnalysis;
}) {
  if (!analysis?.element_distribution) return null;
  const max = Math.max(...analysis.element_distribution.map((e) => e.count));
  return (
    <div className="flex items-center gap-3 h-18 mt-6">
      {analysis.element_distribution.map((el) => {
        const colorKey =
          typeof el.element === "string" && el.element.length > 0
            ? el.element.charAt(0).toUpperCase() +
              el.element.slice(1).toLowerCase()
            : "";
        return (
          <div key={el.element} className="flex flex-col items-center">
            <div
              className={`w-8 rounded-t ${
                ELEMENT_COLORS[colorKey] || "bg-gray-300"
              }`}
              style={{
                height: `${(el.count / (max || 1)) * 100}%`,
                minHeight: 12,
                transition: "height 0.3s",
              }}
              title={`${el.element}: ${el.count} (${el.strength})`}
            />
            <span className="mt-1 font-bold text-xs text-white">
              {el.count}
            </span>
            <ElementTag element={el.element}>{el.element}</ElementTag>
            <span className="text-xs text-gray-300">{el.strength}</span>
          </div>
        );
      })}
    </div>
  );
}

function GodInfoBlock({ god, label, t }: { god: GodInfo; label: string; t: any }) {
  if (!god) return null;
  return (
    <div className="mb-3">
      <div className="font-semibold text-orange-400 mb-2">{label}:</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {god.elements?.map((el) => (
          <ElementTag key={el} element={el} />
        ))}
      </div>
      {god.detailed_analysis && (
        <div className="text-sm text-gray-300 mb-3">
          <ReactMarkdown children={god.detailed_analysis} />
        </div>
      )}
      {god.explanation && (
        <div className="text-sm text-gray-100 mb-2 font-bold">
          <ReactMarkdown children={god.explanation} />
        </div>
      )}
    </div>
  );
}

function RenderKeyPoint({
  key_point,
  className,
}: {
  key_point?: string;
  className?: string;
}) {
  if (!key_point) return null;
  return (
    <div className={`text-base text-gray-200 mb-2 ${className}`}>
      <b>
        <i>
          <ReactMarkdown
            components={{
              strong: ({ node, ...props }) => (
                <b className="text-yellow-500" {...props} />
              ),
            }}
            children={`"${key_point}"`}
          />
        </i>
      </b>
    </div>
  );
}

function RenderDetailedAnalysis({
  detailed_analysis,
  className,
}: {
  detailed_analysis?: string;
  className?: string;
}) {
  if (!detailed_analysis) return null;
  return (
    <div className={`text-gray-300 text-base ${className}`}>
      <ReactMarkdown
        components={{
          strong: ({ node, ...props }) => (
            <b className="text-yellow-500" {...props} />
          ),
        }}
        children={detailed_analysis}
      />
    </div>
  );
}

function FengShuiTable({ items, t }: { items: FengShuiItem[]; t: any }) {
  if (!items?.length) return null;
  return (
    <div className="overflow-x-auto mt-2 mb-4">
      <table className="min-w-[480px] border border-yellow-400 rounded bg-gray-900/80 text-sm">
        <thead>
          <tr className="bg-yellow-900/30 text-yellow-300">
            <th className="px-2 py-1 border-b border-yellow-400">
              {t("destiny.result.fengShui.itemName", "Tên vật phẩm")}
            </th>
            <th className="px-2 py-1 border-b border-yellow-400">{t("destiny.result.fengShui.element", "Ngũ hành")}</th>
            <th className="px-2 py-1 border-b border-yellow-400">{t("destiny.result.fengShui.material", "Chất liệu")}</th>
            <th className="px-2 py-1 border-b border-yellow-400">{t("destiny.result.fengShui.purpose", "Công dụng")}</th>
            <th className="px-2 py-1 border-b border-yellow-400">{t("destiny.result.fengShui.usage", "Cách dùng")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-b border-yellow-400 text-white">
              <td className="px-2 py-1 font-semibold">{item.name}</td>
              <td className="px-2 py-1">
                {item.elements?.map((el) => (
                  <ElementTag key={el} element={el} />
                ))}
              </td>
              <td className="px-2 py-1">{item.material}</td>
              <td className="px-2 py-1">{item.purpose}</td>
              <td className="px-2 py-1">{item.usage_instructions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LockedSectionNotice({ onPayClick, t }: { onPayClick?: () => void; t: any }) {
  return (
    <div
      onClick={onPayClick}
      className={`flex flex-col items-start justify-center my-4 ${
        onPayClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg px-3 py-2 flex items-center gap-2 shadow animate-pulse">
        <LockKeyhole className="w-5 h-5 text-yellow-500" />
        <span className="text-xs">
          {t("destiny.result.lockedContent", "Nội dung này đang khoá. nhấn vào đây để mở khoá")}
        </span>
      </div>
    </div>
  );
}

// Define the props type for ExplanationSection
type ExplanationSectionProps = {
  result: TuTruAnalysisResult;
  t: any;
  isPaid: boolean;
  loading: boolean;
  children?: React.ReactNode;
  onPayClick?: () => void;
};

export const ExplanationSection = forwardRef<
  HTMLDivElement,
  ExplanationSectionProps
>(function ExplanationSection(
  { result, t, isPaid, loading, children, onPayClick },
  ref
) {
  if (loading) {
    return (
      <section className="p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg flex flex-col items-center justify-center min-h-[260px] relative">
        <div className="absolute top-4 right-4 animate-pulse">
          <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow" />
        </div>
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-yellow-400 mb-4" />
        <div className="text-yellow-300 text-lg font-bold mb-2">
          {t("destiny.result.loading.analyzing", "Đang tham vấn và luận giải chi tiết cho lá số bát tự tứ trụ của bạn...")}
        </div>
        <div className="text-yellow-100 text-base text-center mb-2 animate-pulse">
          {t("destiny.result.loading.systemAnalyzing", "Hệ thống đang phân tích hàng triệu tổ hợp, yếu tố, và khía cạnh để mang đến kết quả")}{" "}
          <span className="text-yellow-400 font-semibold">{t("destiny.result.loading.personalized", "cá nhân hóa")}</span> {t("common.and", "và")}{" "}
          <span className="text-yellow-400 font-semibold">{t("destiny.result.loading.comprehensive", "chuyên sâu")}</span>{" "}
          {t("destiny.result.loading.best", "nhất")}.
        </div>
        <div className="text-xs text-gray-300 text-center max-w-md">
          <span className="inline-block animate-pulse">
            ⏳ {t("destiny.result.loading.timeEstimate", "Quá trình này có thể mất")} <b>{t("destiny.result.loading.timeMin", "20 giây")}</b> {t("destiny.result.loading.timeTo", "đến")} <b>{t("destiny.result.loading.timeMax", "hơn 1 phút")}</b>.
            <br />
            <span className="text-yellow-400">{t("destiny.result.loading.patience", "Xin hãy kiên nhẫn chờ đợi!")}</span>
          </span>
        </div>
        <div className="flex gap-1 mt-4">
          <span
            className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="w-2 h-2 bg-yellow-200 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </section>
    );
  }
  if (!result) return null;

  // Helper để kiểm tra section có data không
  function isSectionLocked(...fields: (string | undefined)[]) {
    return !isPaid && fields.every((v) => !v || v.trim() === "");
  }

  return (
    <section
      ref={ref}
      className="p-2 xs:p-4 md:p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <Gift className="w-6 h-6" />
        {t("destiny.result.analysis", "Luận giải chi tiết")}
      </h2>
      <div className="space-y-10">
        {/* 1. Nhật Chủ */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-yellow-400" />
            {result.day_master_analysis?.title}
          </h3>
          {isSectionLocked(
            result.day_master_analysis?.key_point,
            result.day_master_analysis?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint
                key_point={result.day_master_analysis?.key_point}
              />
              <RenderDetailedAnalysis
                detailed_analysis={
                  result.day_master_analysis?.detailed_analysis
                }
              />
            </>
          )}
        </section>

        {/* 2. Ngũ Hành */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            {result.five_elements_analysis?.title}
          </h3>
          {isSectionLocked(
            result.five_elements_analysis?.key_point,
            result.five_elements_analysis?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint
                key_point={result.five_elements_analysis?.key_point}
              />
              <RenderDetailedAnalysis
                detailed_analysis={
                  result.five_elements_analysis?.detailed_analysis
                }
              />
              <div className="flex justify-center">
                <FiveElementsBarChart
                  analysis={result.five_elements_analysis}
                />
              </div>
            </>
          )}
        </section>

        {/* 3. Thập Thần */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            {result.ten_gods_analysis?.title}
          </h3>
          {isSectionLocked(
            result.ten_gods_analysis?.key_point,
            result.ten_gods_analysis?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint key_point={result.ten_gods_analysis?.key_point} />
              <RenderDetailedAnalysis
                detailed_analysis={result.ten_gods_analysis?.detailed_analysis}
              />
            </>
          )}
        </section>

        {/* 4. Dụng thần - Kỵ thần */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-400" />
            {result.useful_and_unfavorable_gods?.title}
          </h3>
          {isSectionLocked(
            result.useful_and_unfavorable_gods?.key_point,
            result.useful_and_unfavorable_gods?.detailed_analysis,
            result.useful_and_unfavorable_gods?.useful_gods?.elements?.join(""),
            result.useful_and_unfavorable_gods?.unfavorable_gods?.elements?.join(
              ""
            )
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <GodInfoBlock
                  god={result.useful_and_unfavorable_gods?.useful_gods}
                  label={t("destiny.result.gods.useful", "Dụng thần")}
                  t={t}
                />
                <GodInfoBlock
                  god={result.useful_and_unfavorable_gods?.unfavorable_gods}
                  label={t("destiny.result.gods.unfavorable", "Kỵ thần")}
                  t={t}
                />
              </div>
              <RenderKeyPoint
                key_point={result.useful_and_unfavorable_gods?.key_point}
              />
              <RenderDetailedAnalysis
                detailed_analysis={
                  result.useful_and_unfavorable_gods?.detailed_analysis
                }
              />
            </>
          )}
        </section>

        {/* 5. Đại vận */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            {result.ten_year_cycles?.title}
          </h3>
          {isSectionLocked(
            result.ten_year_cycles?.key_point,
            result.ten_year_cycles?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint key_point={result.ten_year_cycles?.key_point} />
              <RenderDetailedAnalysis
                detailed_analysis={result.ten_year_cycles?.detailed_analysis}
              />
              {result.ten_year_cycles?.cycles?.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-[420px] border border-yellow-400 rounded bg-gray-900/80 text-sm">
                    <thead>
                      <tr className="bg-yellow-900/30 text-yellow-300">
                        <th className="px-2 py-1 border-b border-yellow-400">
                          {t("destiny.result.cycles.period", "Giai đoạn")}
                        </th>
                        <th className="px-2 py-1 border-b border-yellow-400">
                          {t("destiny.result.cycles.canChi", "Can Chi")}
                        </th>
                        <th className="px-2 py-1 border-b border-yellow-400">
                          {t("destiny.result.cycles.element", "Ngũ hành")}
                        </th>
                        <th className="px-2 py-1 border-b border-yellow-400">
                          {t("destiny.result.cycles.analysis", "Phân tích")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.ten_year_cycles.cycles.map((cycle, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-yellow-400 text-white"
                        >
                          <td className="px-2 py-1 font-semibold">
                            {cycle.age_range}
                          </td>
                          <td className="px-2 py-1">{cycle.can_chi}</td>
                          <td className="px-2 py-1">
                            <ElementTag element={cycle.element} />
                          </td>
                          <td className="px-2 py-1">{cycle.analysis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </section>

        {/* 6. Nghề nghiệp */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-400" />
            {result.career_guidance?.title}
          </h3>
          {isSectionLocked(
            result.career_guidance?.key_point,
            result.career_guidance?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint key_point={result.career_guidance?.key_point} />
              <RenderDetailedAnalysis
                detailed_analysis={result.career_guidance?.detailed_analysis}
              />
            </>
          )}
        </section>

        {/* 7. Cải vận */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {result.improvement_suggestions?.title}
          </h3>
          {isSectionLocked(
            result.improvement_suggestions?.key_point,
            result.improvement_suggestions?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint
                key_point={result.improvement_suggestions?.key_point}
              />
              <RenderDetailedAnalysis
                detailed_analysis={
                  result.improvement_suggestions?.detailed_analysis
                }
              />
              <FengShuiTable
                items={result.improvement_suggestions?.feng_shui_items || []}
                t={t}
              />
            </>
          )}
        </section>

        {/* 8. Kết luận */}
        <section>
          <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-yellow-400" />
            {result.conclusion?.title}
          </h3>
          {isSectionLocked(
            result.conclusion?.key_point,
            result.conclusion?.detailed_analysis
          ) ? (
            <LockedSectionNotice onPayClick={onPayClick} t={t} />
          ) : (
            <>
              <RenderKeyPoint key_point={result.conclusion?.key_point} />
              <RenderDetailedAnalysis
                detailed_analysis={result.conclusion?.detailed_analysis}
              />
            </>
          )}
        </section>
      </div>
      {children}
    </section>
  );
});
