"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTopupWindow } from "@/hooks/use-topup-window";
import { useMyFates } from "@/contexts/MyFatesContext";

const DefaultBtnClsName = "w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2";

export default function TestClient() {
  const { openTopup } = useTopupWindow();
  const { t } = useTranslation(["common", "destiny", "attributes"]);
  const { fetchMyFates } = useMyFates();

  const handlePaid = () => {
    openTopup(() => {
      handleAfterTopup();
    });
  };

  const handleAfterTopup = () => {
    fetchMyFates();
  };

  return (
    <>
      <section className="mb-12 p-6 sm:p-8 bg-gradient-to-br from-slate-800/70 via-gray-800/80 to-slate-800/70 rounded-xl shadow-2xl border border-yellow-500/40 backdrop-blur-sm">
        <button onClick={handlePaid} className={DefaultBtnClsName}>Nạp duyên</button>
        <br />
        <button onClick={handleAfterTopup} className={DefaultBtnClsName}>Load duyên</button>
      </section>
    </>
  );
}
