"use client";

import { User } from "lucide-react";
import { formatDateTime, getGenderLabel, getCategoryLabel } from "./utils";

export function InputInfoSection({ input, genders, categories, t }: any) {
  return (
    <section className="p-2 xs:p-4 md:p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <User className="w-6 h-6" />{" "}
        {t("destiny.result.inputInfo", "Thông tin mệnh chủ")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
        <div>
          <span className="font-semibold text-yellow-600">
            {t("destiny.form.nameLabel", "Họ và tên")}:
          </span>
          <span className="ml-2 text-white font-medium">{input?.name}</span>
        </div>
        <div>
          <span className="font-semibold text-yellow-600">
            {t("destiny.form.birthDateLabel", "Ngày sinh dương lịch")}:
          </span>
          <span className="ml-2 text-white font-medium">{formatDateTime(input?.birthDateTime)}</span>
        </div>
        <div>
          <span className="font-semibold text-yellow-600">
            {t("destiny.form.genderLabel", "Giới tính")}:
          </span>
          <span className="ml-2 text-white font-medium">{getGenderLabel(input?.gender, genders)}</span>
        </div>
        <div>
          <span className="font-semibold text-yellow-600">
            {t("destiny.form.categoryLabel", "Chủ đề quan tâm")}:
          </span>
          <span className="ml-2 text-white font-medium">{getCategoryLabel(input?.category, categories)}</span>
        </div>
      </div>
    </section>
  );
}
