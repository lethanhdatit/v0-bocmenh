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
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Stars,
  Calendar,
  Clock,
  User,
  Building,
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

  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [gender, setGender] = useState<number>(genders[0].value);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!birthPlace.trim() || !birthDate) {
      setFormError(t("destiny.form.validationError")); // Use namespace
      return;
    }

    showGlobalLoading(t("destiny.form.loadingMessagePage"));

    try {
      // Data for the POST request
      const postData = {
        birthPlace: birthPlace.trim(),
        birthDate,
        birthTime: birthTime || undefined,
        gender: gender,
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
    <>
      <Card className="w-full max-w-lg mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm">
        <CardHeader className="text-center">
          {/* <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            {t("destiny.form.title")}
          </CardTitle> */}
          <CardDescription className="text-gray-300 mt-1 text-left">
            <i>{t("features.destiny.description")}</i>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formError && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-sm flex items-center gap-2">
              <AlertCircle size={18} /> {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white rounded-lg transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                {t("destiny.form.birthTimeHint")}
              </p>
            </div>
            <div>
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
            </div>
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
                <SelectContent className="bg-amber-50 border-amber-600 max-h-60 overflow-y-auto">
                  {genders.map((gender: { value: number; label: string }) => (
                    <SelectItem
                      key={gender.value}
                      value={gender.value.toString()}
                      className="ancient-font text-amber-800 hover:bg-amber-100"
                    >
                      {gender.label}
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
        </CardContent>
        {getIsLoading() && (
          <CardFooter className="flex justify-center pt-4 border-t border-gray-700/50">
            <p className="text-sm text-yellow-300 animate-pulse">
              {t("destiny.form.loadingMessagePage")}
            </p>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
