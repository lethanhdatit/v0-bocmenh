"use client";

import type React from "react";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, AlertCircle, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function LoginModal() {
  const { t } = useTranslation();
  const {
    activeModal,
    closeAuthModal,
    openRegisterModal,
    openForgotPasswordModal,
    login,
    isLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const result = await login(
      formData.email,
      formData.password,
      formData.rememberMe
    );
    if (!result.success) {
      setErrors(
        result.errors || ({ system: result.message } as Record<string, string>)
      );
      setMessage(result.message || t("auth.login.loginFailed"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const switchToRegister = () => {
    setFormData({ email: "", password: "", rememberMe: false });
    setErrors({});
    setMessage("");
    openRegisterModal();
  };

  const switchToForgotPassword = () => {
    setFormData({ email: "", password: "", rememberMe: false });
    setErrors({});
    setMessage("");
    openForgotPasswordModal();
  };

  return (
    <Dialog
      open={activeModal === "login"}
      onOpenChange={(isOpen) => {
        if (!isOpen) closeAuthModal();
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-yellow-500/30 text-gray-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            {t("auth.login.title")}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {t("auth.login.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {/* Demo accounts info */}
        {/* <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
          <p className="text-blue-400 text-sm font-medium mb-2">{t("auth.login.demoAccounts")}</p>
          <div className="text-xs text-blue-300 space-y-1">
            <div>{t("auth.login.demoRegular")}</div>
            <div>{t("auth.login.demoPremium")}</div>
          </div>
        </div> */}

        {/* Error Message */}
        {message && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2"
          >
            <AlertCircle size={18} className="text-red-400" />
            <div>
              <p className="text-red-400 text-sm">{message}</p>
              <div className="mt-1">
                {Object.keys(errors).map((key) =>
                  errors[key] ? (
                    <p key={key} className="text-red-400 text-xs">
                      • {errors[key]}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          </motion.div>
        )}
        {/* Success Message */}
        {message && !Object.keys(errors).length && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4"
          >
            <p className="text-green-400 text-sm">{message}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 py-4">
          {/* Email Field */}
          <div>
            <Label
              htmlFor="email-modal"
              className="flex items-center space-x-2 text-yellow-400 mb-2"
            >
              <Mail className="w-4 h-4" />
              <span>{t("auth.login.email")}</span>
            </Label>
            <Input
              id="email-modal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 ${
                errors.email
                  ? "border-red-500 focus:border-red-400"
                  : "focus:border-yellow-500"
              }`}
              placeholder={t("auth.login.emailPlaceholder")}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label
              htmlFor="password-modal"
              className="flex items-center space-x-2 text-yellow-400 mb-2"
            >
              <Lock className="w-4 h-4" />
              <span>{t("auth.login.password")}</span>
            </Label>
            <div className="relative">
              <Input
                id="password-modal"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-12 ${
                  errors.password
                    ? "border-red-500 focus:border-red-400"
                    : "focus:border-yellow-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe-modal"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600"
              />
              <Label
                htmlFor="rememberMe-modal"
                className="text-sm text-gray-300 cursor-pointer"
              >
                {t("auth.login.rememberMe")}
              </Label>
            </div>
            <button
              type="button"
              onClick={switchToForgotPassword}
              className="text-sm text-yellow-400 hover:text-yellow-300 hover:underline"
            >
              {t("auth.login.forgotPassword")}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              t("auth.login.loginButton")
            )}
          </Button>
        </form>

        <DialogFooter className="sm:justify-center">
          <p className="text-sm text-gray-400">
            {t("auth.login.noAccount")}{" "}
            <button
              onClick={switchToRegister}
              className="font-medium text-yellow-400 hover:text-yellow-300 hover:underline"
            >
              {t("auth.login.registerNow")}
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
