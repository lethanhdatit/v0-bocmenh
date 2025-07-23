"use client";

import { Stars } from "lucide-react";

// --- TruTable component ---
function TruTable({ tutru }: { tutru: any }) {
  const cols = [
    { key: "thien_tru", label: "Năm" },
    { key: "nguyet_tru", label: "Tháng" },
    { key: "nhat_tru", label: "Ngày" },
    { key: "thoi_tru", label: "Giờ" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border border-yellow-400 rounded-lg bg-gray-900/80 text-center min-w-[420px]">
        <thead>
          <tr>
            {cols.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 border-b border-yellow-400 text-yellow-300 font-semibold"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Can Chi */}
          <tr>
            {cols.map((col) => (
              <td
                key={col.key}
                className="px-3 py-2 border-b border-yellow-400 text-lg font-bold"
              >
                {tutru?.[col.key]?.year_can_chi ||
                  tutru?.[col.key]?.month_can_chi ||
                  tutru?.[col.key]?.day_can_chi ||
                  tutru?.[col.key]?.hour_can_chi ||
                  tutru?.[col.key]?.can_chi ||
                  "--"}
              </td>
            ))}
          </tr>
          {/* Can */}
          <tr>
            {cols.map((col) => (
              <td key={col.key} className="px-3 py-1 text-blue-300">
                {tutru?.[col.key]?.year_can ||
                  tutru?.[col.key]?.month_can ||
                  tutru?.[col.key]?.day_can ||
                  tutru?.[col.key]?.hour_can ||
                  "--"}
              </td>
            ))}
          </tr>
          {/* Chi */}
          <tr>
            {cols.map((col) => (
              <td key={col.key} className="px-3 py-1 text-green-300">
                {tutru?.[col.key]?.year_chi ||
                  tutru?.[col.key]?.month_chi ||
                  tutru?.[col.key]?.day_chi ||
                  tutru?.[col.key]?.hour_chi ||
                  "--"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// --- LaSoTuTru component ---
export function LaSoTuTruSection({ preData, t }: any) {
  return (
    <section className="p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <Stars className="w-6 h-6" />{" "}
        {t("destiny.result.battuChart", "Lá số Bát tự Tứ trụ")}
      </h2>
      <div className="mb-4">
        <TruTable tutru={preData?.tutru} />
      </div>
      {/* Có thể bổ sung thêm các thông tin khác từ preData nếu muốn */}
    </section>
  );
}
