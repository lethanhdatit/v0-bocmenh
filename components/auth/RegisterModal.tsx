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
import {
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function RegisterModal() {
  const { t } = useTranslation();
  const { activeModal, closeAuthModal, openLoginModal, register, isLoading } =
    useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    // Client-side validation
    const clientErrors: Record<string, string> = {};
    if (!formData.agreeToTerms) {
      clientErrors.agreeToTerms = t("auth.register.agreeTermsError");
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    if (!result.success) {
      setErrors(
        result.errors || ({ system: result.message } as Record<string, string>)
      );
      setMessage(result.message || t("auth.register.registerFailed"));
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

  const switchToLogin = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
    setErrors({});
    setMessage("");
    openLoginModal();
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];
  const strengthLabels = [
    t("auth.register.strengthWeak"),
    t("auth.register.strengthFair"),
    t("auth.register.strengthGood"),
    t("auth.register.strengthStrong"),
  ];

  return (
    <Dialog
      open={activeModal === "register"}
      onOpenChange={(isOpen) => {
        if (!isOpen) closeAuthModal();
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-yellow-500/30 text-gray-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            {t("auth.register.title")}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {t("auth.register.subtitle")}
          </DialogDescription>
        </DialogHeader>

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

        <form onSubmit={handleRegister} className="space-y-4 py-4">
          {/* Name Field */}
          <div>
            <Label
              htmlFor="name-modal"
              className="flex items-center space-x-2 text-yellow-400 mb-2"
            >
              <User className="w-4 h-4" />
              <span>{t("auth.register.name")}</span>
            </Label>
            <Input
              id="name-modal"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 ${
                errors.name
                  ? "border-red-500 focus:border-red-400"
                  : "focus:border-yellow-500"
              }`}
              placeholder={t("auth.register.namePlaceholder")}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label
              htmlFor="email-register-modal"
              className="flex items-center space-x-2 text-yellow-400 mb-2"
            >
              <Mail className="w-4 h-4" />
              <span>{t("auth.register.email")}</span>
            </Label>
            <Input
              id="email-register-modal"
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
              placeholder={t("auth.register.emailPlaceholder")}
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
              htmlFor="password-register-modal"
              className="flex items-center space-x-2 text-yellow-400 mb-2"
            >
              <Lock className="w-4 h-4" />
              <span>{t("auth.register.password")}</span>
            </Label>
            <div className="relative">
              <Input
                id="password-register-modal"
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
                placeholder={t("auth.register.passwordPlaceholder")}
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

            {/* Password Strength Indicator */}
            {formData.password && (
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
                  {t("auth.register.passwordStrength")}{" "}
                  <span className="text-yellow-500">
                    {strengthLabels[passwordStrength - 1] ||
                      t("auth.register.strengthWeak")}
                  </span>
                </p>
              </div>
            )}

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

          {/* Confirm Password Field */}
          <div>
            <Label
              htmlFor="confirmPassword-modal"
              className="flex items-center space-x-2 text-yellow-400 mb-2"
            >
              <Lock className="w-4 h-4" />
              <span>{t("auth.register.confirmPassword")}</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword-modal"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-12 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-400"
                    : "focus:border-yellow-500"
                }`}
                placeholder={t("auth.register.confirmPasswordPlaceholder")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          {/* Terms Agreement */}
          <div>
            <label className="flex items-start space-x-3 text-gray-300">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={`w-4 h-4 mt-0.5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2 ${
                  errors.agreeToTerms ? "border-red-500" : ""
                }`}
              />
              <span className="text-sm">
                {t("auth.register.agreeToTerms")}{" "}
                <a
                  href="/terms"
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  {t("auth.register.termsOfService")}
                </a>{" "}
                {t("auth.register.and")}{" "}
                <a
                  href="/privacy"
                  className="text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  {t("auth.register.privacyPolicy")}
                </a>
              </span>
            </label>
            {errors.agreeToTerms && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.agreeToTerms}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              t("auth.register.registerButton")
            )}
          </Button>
        </form>

        <DialogFooter className="sm:justify-center">
          <p className="text-sm text-gray-400">
            {t("auth.register.haveAccount")}{" "}
            <button
              onClick={switchToLogin}
              className="font-medium text-yellow-400 hover:text-yellow-300 hover:underline"
            >
              {t("auth.register.loginNow")}
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
