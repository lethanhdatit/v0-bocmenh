"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Stars,
  Calendar,
  Clock,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiClient } from "@/lib/api/apiClient";
import {
  showGlobalLoading,
  hideGlobalLoading,
  getIsLoading,
} from "@/lib/utils";

export default function DestinyForm() {
  const { t } = useTranslation();
  const router = useRouter();

  const genders = (t("genders", { returnObjects: true }) as Array<any>) || [];
  const categories =
    (t("batTuTuTruCategories", { returnObjects: true }) as Array<any>) || [];

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [gender, setGender] = useState<number>(genders[0].value);
  const [category, setCategory] = useState<number>(categories[0].value); // <-- thêm state category
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !birthDate) {
      setFormError(t("destiny.form.validationError")); // Use namespace
      return;
    }

    showGlobalLoading(t("destiny.form.loadingMessagePage"));

    try {
      // Data for the POST request
      const postData = {
        name: name.trim(), // <-- thêm name vào postData
        // birthPlace: birthPlace.trim(),
        birthDate,
        birthTime: birthTime || undefined,
        gender: gender,
        category: category, // <-- thêm category vào postData
      };

      const response = await apiClient.post("/destiny", postData);

      if (response.data.success && response.data.data) {
        // Navigate to the destiny page which will then fetch results based on these params
        router.push(`/destiny?id=${response.data.data.id.toString()}`);
      }
    } catch (error: any) {
      setFormError(
        error.response?.data?.message ??
          error.response?.errors?.general ??
          t("common.errorUnexpected")
      );
    } finally {
      hideGlobalLoading();
    }
  };

  return (
    <div className="space-y-10">
      {formError && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-sm flex items-center gap-2">
          <AlertCircle size={18} /> {formError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Name field (ở đầu) --- */}
        <div>
          <Label
            htmlFor="name"
            className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5"
          >
            <User className="w-5 h-5" />
            <span>{t("destiny.form.nameLabel", "Họ và tên")}</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white placeholder-gray-500 rounded-lg transition-colors"
            placeholder={t("destiny.form.namePlaceholder", "Nhập họ tên")}
          />
        </div>
        {/* --- Các trường khác giữ nguyên --- */}
        {/* ...birthDate, birthTime, birthPlace, gender... */}
        <div>
          <Label
            htmlFor="birthDate"
            className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5"
          >
            <Calendar className="w-5 h-5" />
            <span>{t("destiny.form.birthDateLabel")}</span>
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white rounded-lg transition-colors"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <Label
            htmlFor="birthTime"
            className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5"
          >
            <Clock className="w-5 h-5" />
            <span>{t("destiny.form.birthTimeLabel")}</span>
          </Label>
          <Select
            value={birthTime}
            onValueChange={(value) => setBirthTime(value)}
          >
            <SelectTrigger className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white rounded-lg transition-colors">
              <SelectValue placeholder={t("destiny.form.birthTimeSelectPlaceholder", "Chọn giờ sinh (0-23)")} />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-600 max-h-60 overflow-y-auto">
              {[...Array(24).keys()].map((h) => (
                <SelectItem key={h} value={h.toString()} className="ancient-font text-xs text-gray-800 hover:bg-amber-100">
                  {h.toString().padStart(2, "0")}h
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400 mt-1">
            {t("destiny.form.birthTimeHint", "Chỉ chọn số giờ (0-23)")}
          </p>
        </div>
        {/* <div>
              <Label
                htmlFor="birthPlace"
                className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5"
              >
                <Building className="w-5 h-5" />
                <span>{t("destiny.form.birthPlaceLabel")}</span>
              </Label>
              <Input
                id="birthPlace"
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white placeholder-gray-500 rounded-lg transition-colors"
                placeholder={t("destiny.form.birthPlacePlaceholder")}
              />
            </div> */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5">
            <User className="w-5 h-5" />
            <span>{t("destiny.form.genderLabel")}</span>
          </Label>
          <Select
            value={(gender ?? genders[0].value).toString()}
            onValueChange={(value) => setGender(Number.parseInt(value))}
          >
            <SelectTrigger className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white placeholder-gray-500 rounded-lg transition-colors">
              <SelectValue placeholder={t("destiny.form.genderLabel")} />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-600 max-h-60 overflow-y-auto">
              {genders.map((gender: { value: number; label: string }) => (
                <SelectItem
                  key={gender.value}
                  value={gender.value.toString()}
                  className="ancient-font text-xs text-gray-800 hover:bg-amber-100"
                >
                  {gender.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* --- Category field (ở cuối) --- */}
        <div className="space-y-2">
          <Label className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5">
            <Stars className="w-5 h-5" />
            <span>{t("destiny.form.categoryLabel", "Chủ đề quan tâm")}</span>
          </Label>
          <Select
            value={(category ?? categories[0].value).toString()}
            onValueChange={(value) => setCategory(Number.parseInt(value))}
          >
            <SelectTrigger className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white placeholder-gray-500 rounded-lg transition-colors">
              <SelectValue
                placeholder={t("destiny.form.categoryLabel", "Chủ đề quan tâm")}
              />
            </SelectTrigger>
            <SelectContent className="bg-white border-amber-600 max-h-60 overflow-y-auto">
              {categories.map((cat: { value: number; label: string }) => (
                <SelectItem
                  key={cat.value}
                  value={cat.value.toString()}
                  className="ancient-font text-xs text-gray-800 hover:bg-amber-100"
                >
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={getIsLoading()}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-gray-900 font-semibold py-3.5 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2.5"
        >
          {getIsLoading() ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Stars className="w-6 h-6" />
          )}
          <span>
            {getIsLoading()
              ? t("common.processing")
              : t("destiny.form.submitButton")}
          </span>
        </Button>
      </form>
      {getIsLoading() && (
        <div className="flex justify-center pt-4 border-t border-gray-700/50">
          <p className="text-sm text-yellow-300 animate-pulse">
            {t("destiny.form.loadingMessagePage")}
          </p>
        </div>
      )}
    </div>
  );
}
