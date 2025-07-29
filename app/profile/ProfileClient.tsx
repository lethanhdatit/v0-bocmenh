"use client";

import { useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Shield,
  CreditCard,
  RefreshCw,
  Copy,
  Edit2,
  Check,
  FileText,
  X,
  Eye,
  EyeOff,
  Lock,
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
  
  // Change password states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

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

  // Password change handlers
  const handleOpenChangePassword = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setPasswordErrors({});
    setIsChangingPassword(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setPasswordErrors({});
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = () => {
    const errors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = t("profile.currentPasswordRequired", "Vui lòng nhập mật khẩu hiện tại");
    }

    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      errors.newPassword = t("profile.newPasswordInvalid", "Mật khẩu mới phải có ít nhất 6 ký tự");
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = t("profile.confirmPasswordMismatch", "Mật khẩu xác nhận không khớp");
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = t("profile.newPasswordSameAsCurrent", "Mật khẩu mới phải khác mật khẩu hiện tại");
    }

    return errors;
  };

  const handleChangePassword = async () => {
    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsUpdating(true);
    try {
      await updateUserProfile({
        password: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      toast({
        title: t("common.success"),
        description: t("profile.passwordChangeSuccess", "Đổi mật khẩu thành công"),
      });
      
      handleCloseChangePassword();

      window.location.reload();
    } catch (error) {
      toast({
        title: t("auth.resetPassword.error"),
        description: t("profile.passwordChangeFailed", "Đổi mật khẩu thất bại"),
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = [
    t("profile.passwordWeak", "Yếu"),
    t("profile.passwordFair", "Trung bình"),
    t("profile.passwordGood", "Tốt"),
    t("profile.passwordStrong", "Mạnh"),
  ];

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
                onClick={handleOpenChangePassword}
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

      {/* Change Password Modal */}
      <Dialog open={isChangingPassword} onOpenChange={(open) => !open && handleCloseChangePassword()}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-yellow-500/30 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-yellow-400">
              {t("profile.changePassword", "Đổi mật khẩu")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Current Password */}
            <div>
              <Label className="flex items-center space-x-2 text-yellow-400 mb-2">
                <Lock className="w-4 h-4" />
                <span>{t("profile.currentPassword", "Mật khẩu hiện tại")}</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-12 ${
                    passwordErrors.currentPassword
                      ? "border-red-500 focus:border-red-400"
                      : "focus:border-yellow-500"
                  }`}
                  placeholder={t("profile.currentPasswordPlaceholder", "Nhập mật khẩu hiện tại")}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <Label className="flex items-center space-x-2 text-yellow-400 mb-2">
                <Lock className="w-4 h-4" />
                <span>{t("profile.newPassword", "Mật khẩu mới")}</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-12 ${
                    passwordErrors.newPassword
                      ? "border-red-500 focus:border-red-400"
                      : "focus:border-yellow-500"
                  }`}
                  placeholder={t("profile.newPasswordPlaceholder", "Nhập mật khẩu mới")}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {passwordData.newPassword && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i < passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {t("profile.passwordStrengthLabel", "Độ mạnh")}: {" "}
                    <span className="text-yellow-500">
                      {strengthLabels[passwordStrength - 1] || strengthLabels[0]}
                    </span>
                  </p>
                </div>
              )}

              {passwordErrors.newPassword && (
                <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <Label className="flex items-center space-x-2 text-yellow-400 mb-2">
                <Lock className="w-4 h-4" />
                <span>{t("profile.confirmNewPassword", "Xác nhận mật khẩu mới")}</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordInputChange}
                  className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-12 ${
                    passwordErrors.confirmNewPassword
                      ? "border-red-500 focus:border-red-400"
                      : "focus:border-yellow-500"
                  }`}
                  placeholder={t("profile.confirmNewPasswordPlaceholder", "Nhập lại mật khẩu mới")}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.confirmNewPassword && (
                <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmNewPassword}</p>
              )}
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              onClick={handleCloseChangePassword}
              variant="outline"
              className="border-gray-600 hover:text-white text-gray-600 hover:bg-gray-800"
            >
              {t("common.cancel", "Hủy")}
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={isUpdating}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {t("common.processing", "Đang xử lý...")}
                </>
              ) : (
                t("profile.changePassword", "Đổi mật khẩu")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
