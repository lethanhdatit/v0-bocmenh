"use client";

import { useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Calendar,
  Clock,
  Shield,
  CreditCard,
  RefreshCw,
  Copy,
  Edit2,
  Check,
  FileText,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useMyFates } from "@/contexts/MyFatesContext";
import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "@/lib/profiles";
import { toast } from "@/hooks/use-toast";
import { useTopupWindow } from "@/hooks/use-topup-window";
import { useRouter } from "next/navigation";
import { FatesUnit } from "@/components/common/FatesUnit";
import { formatDateTime } from "@/lib/infra/utils";

const fetcher = () => getUserProfile();

export default function ProfileClient() {
  const { t, i18n } = useTranslation(["common", "auth"]);
  const { user, refreshUser } = useAuth();
  const { myFates } = useMyFates();
  const { openTopup } = useTopupWindow();
  const router = useRouter();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: profile,
    error,
    isLoading,
    mutate,
  } = useSWR<UserProfile>("user-profile", fetcher);

  const handleRefresh = async () => {
    try {
      await mutate();
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("common.errorUnexpected"),
        variant: "destructive",
      });
    }
  };

  const handleStartEditName = () => {
    setEditedName(profile?.name || "");
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) return;

    setIsUpdating(true);
    try {
      await updateUserProfile({ displayName: editedName.trim() });
      await mutate();
      await refreshUser(true);
      setIsEditingName(false);
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("profile.updateFailed", "Cập nhật thất bại"),
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t("common.copied"),
        description: `${label} ${t("common.copied").toLowerCase()}`,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("common.copyFailed"),
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-4">
          {t("profile.loadFailed", "Không thể tải thông tin profile")}
        </div>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("common.tryAgain")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header với refresh button */}
      <div className="flex flex-row items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-yellow-400 text-center text-left">
          {t("profile.title", "Thông tin cá nhân")}
        </h2>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={isLoading}
          className="border-yellow-500/50 text-yellow-400 bg-yellow-300/20 text-yellow-300"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="bg-gray-900/80 border-yellow-500/30">
        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-20 h-20 mx-auto sm:mx-0 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-gray-900" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-white break-words">
                {profile?.name || user?.name || t("common.loading")}
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-400">
                  {t("profile.memberSince", "Thành viên từ")}{" "}
                  {formatDateTime(
                    profile?.createdTs || new Date().toISOString(),
                    i18n.language
                  )}
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-1 text-yellow-400">
                  <span className="font-semibold">
                    {profile?.totalDays || 0} {t("profile.days", "ngày")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fates Section */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-white font-semibold">
                  {t("profile.currentFates", "Duyên hiện có")}
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-3">
                <span className="text-2xl font-bold text-yellow-400">
                  {myFates || "0"}
                </span>
                <FatesUnit
                  type="icon"
                  width={16}
                  height={16}
                  text={t("topups.fatesUnit")}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
              <Button
                onClick={() => openTopup()}
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-white w-full sm:w-auto"
              >
                {t("topups.buyMore", "Nạp duyên")}
              </Button>
              <Button
                onClick={() => router.push("/topups")}
                size="sm"
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 text-yellow-300 w-full sm:w-auto"
              >
                {t("topups.seePackages", "Xem gói")}
              </Button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Label className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span>{t("profile.name", "Họ và tên")}</span>
              </Label>
              {!isEditingName ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm sm:text-base break-words">
                    {profile?.name || user?.name || "..."}
                  </span>
                  <Button
                    onClick={handleStartEditName}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400 flex-shrink-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full sm:w-48 h-8 bg-gray-800 border-gray-600 text-white text-sm"
                    placeholder={t("profile.namePlaceholder", "Nhập họ và tên")}
                  />
                  <Button
                    onClick={handleSaveName}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-green-400 hover:text-green-300 flex-shrink-0"
                    disabled={isUpdating || !editedName.trim()}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleCancelEditName}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300 flex-shrink-0"
                    disabled={isUpdating}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Label className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>{t("profile.email", "Email")}</span>
              </Label>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm sm:text-base break-all max-w-[200px] sm:max-w-none">
                  {profile?.email || user?.email || "..."}
                </span>
                <Button
                  onClick={() =>
                    copyToClipboard(
                      profile?.email || user?.email || "",
                      "Email"
                    )
                  }
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400 flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Label className="flex items-center space-x-2 text-gray-300">
                <Shield className="w-4 h-4" />
                <span>{t("profile.password", "Mật khẩu")}</span>
              </Label>
              <Button
                size="sm"
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 text-yellow-300 w-full sm:w-auto"
              >
                {t("profile.changePassword", "Đổi mật khẩu")}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={() => router.push("/topups-history")}
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 bg-yellow-300/20 text-yellow-300 justify-start"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {t("nav.topupsHistory", "Lịch sử nạp")}
              </Button>
              <Button
                onClick={() => router.push("/services-history")}
                variant="outline"
                className="border-yellow-500/50 text-yellow-400 bg-yellow-300/20 text-yellow-300 justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t("nav.servicesHistory", "Lịch sử sử dụng")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
