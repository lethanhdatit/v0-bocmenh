"use client";

import type React from "react";

import { useState, type FormEvent, useEffect } from "react";
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
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  sendEmailVerification,
  confirmEmailVerification,
} from "@/lib/emailVerification";

type RegistrationStep = "email" | "otp" | "form";

export default function RegisterModal() {
  const { t } = useTranslation();
  const { activeModal, closeAuthModal, openLoginModal, register, isLoading } =
    useAuth();

  const [currentStep, setCurrentStep] = useState<RegistrationStep>("email");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

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

  // Effect for countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCountdown]);

  // Handle email verification step
  const handleSendOTP = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    if (!verificationEmail || !verificationEmail.includes("@")) {
      setErrors({ email: t("auth.emailVerification.invalidEmail") });
      return;
    }

    setIsLoadingVerification(true);

    try {
      const response = await sendEmailVerification({
        email: verificationEmail,
      });
      if (response.success) {
        setCurrentStep("otp");
        setResendCountdown(120); 
        setMessage(t("auth.emailVerification.successSent"));
      } else {
        setErrors({
          email: response.message || t("auth.emailVerification.failed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        t("auth.emailVerification.systemError");
      const errorCode = error?.response?.data?.beErrorCode;

      if (errorCode === "EmailAlreadyExists") {
        setErrors({ email: t("auth.emailVerification.emailExists") });
      } else if (errorCode === "SpamEmailSending") {
        setErrors({
          email: t("auth.emailVerification.spamPrevention", { seconds: 120 }),
        });
        setResendCountdown(120);
      } else {
        setErrors({ email: errorMessage });
      }
    } finally {
      setIsLoadingVerification(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    if (!otp || otp.length !== 6) {
      setErrors({ otp: t("auth.emailVerification.invalidOtp") });
      return;
    }

    setIsLoadingVerification(true);

    try {
      const response = await confirmEmailVerification({
        email: verificationEmail,
        otp: otp,
      });

      if (response.success) {
        setIsEmailVerified(true);
        setCurrentStep("form");
        setFormData((prev) => ({ ...prev, email: verificationEmail }));
        setMessage(t("auth.emailVerification.success"));
      } else {
        setErrors({
          otp: response.message || t("auth.emailVerification.failed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        t("auth.emailVerification.systemError");
      const errorCode = error?.response?.data?.beErrorCode;

      if (errorCode === "ExpiredOtp") {
        setErrors({ otp: t("auth.emailVerification.otpExpired") });
      } else if (errorCode === "InvalidOtp") {
        setErrors({ otp: t("auth.emailVerification.otpIncorrect") });
      } else {
        setErrors({ otp: errorMessage });
      }
    } finally {
      setIsLoadingVerification(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendCountdown > 0) return;

    setErrors({});
    setIsLoadingVerification(true);

    try {
      const response = await sendEmailVerification({
        email: verificationEmail,
      });
      if (response.success) {
        setResendCountdown(120);
        setMessage(t("auth.emailVerification.success"));
      } else {
        setErrors({
          general: response.message || t("auth.emailVerification.failed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        t("auth.emailVerification.systemError");
      setErrors({ general: errorMessage });
    } finally {
      setIsLoadingVerification(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    // Check if email verification expired
    if (!isEmailVerified) {
      setErrors({ general: t("auth.emailVerification.verificationExpired") });
      setCurrentStep("email");
      return;
    }

    // Client-side validation
    const clientErrors: Record<string, string> = {};
    if (!formData.agreeToTerms) {
      clientErrors.agreeToTerms = t("auth.register.agreeTermsError");
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      if (!result.success) {
        setErrors(
          result.errors ||
            ({ system: result.message } as Record<string, string>)
        );
      } else {
        setMessage(result.message!);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || t("auth.register.systemError");
      const errorCode = error?.response?.data?.beErrorCode;

      if (errorCode === "UnverifiedEmail") {
        setErrors({ general: t("auth.register.unverifiedEmail") });
        setCurrentStep("email");
        setIsEmailVerified(false);
      } else if (errorCode === "ExpiredEmailVerification") {
        setErrors({ general: t("auth.register.expiredEmailVerification") });
        setCurrentStep("email");
        setIsEmailVerified(false);
      } else if (errorCode === "ExistedUsername") {
        setErrors({ email: t("auth.register.emailExists") });
      } else {
        setErrors({ general: errorMessage });
      }
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

  const resetModal = () => {
    setCurrentStep("email");
    setVerificationEmail("");
    setOtp("");
    setIsEmailVerified(false);
    setResendCountdown(0);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
    setErrors({});
    setMessage("");
  };

  const switchToLogin = () => {
    resetModal();
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

  const renderEmailVerificationStep = () => (
    <form
      onSubmit={handleSendOTP}
      className="space-y-3 sm:space-y-4 py-2 sm:py-3"
    >
      {/* <div className="text-center mb-3 sm:mb-4">
        <Mail className="mx-auto mb-2 text-yellow-400" size={28} />
        <h3 className="text-base sm:text-lg font-semibold text-yellow-400">
          {t("auth.emailVerification.stepTitle")}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 px-2">
          {t("auth.emailVerification.enterEmailDescription")}
        </p>
      </div> */}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="verification-email"
          className="text-gray-300 text-sm sm:text-base"
        >
          {t("auth.emailVerification.enterEmail")}
        </Label>
        <Input
          id="verification-email"
          type="email"
          value={verificationEmail}
          onChange={(e) => {
            setVerificationEmail(e.target.value);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          required
          className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 text-sm sm:text-base ${
            errors.email
              ? "border-red-500 focus:border-red-400"
              : "focus:border-yellow-500"
          }`}
          placeholder={t("auth.register.emailPlaceholder")}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoadingVerification}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-sm sm:text-base py-2 sm:py-3"
      >
        {isLoadingVerification ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("auth.emailVerification.sending")}
          </>
        ) : (
          t("auth.emailVerification.sendOtpButton")
        )}
      </Button>
    </form>
  );

  const renderOTPVerificationStep = () => (
    <form
      onSubmit={handleVerifyOTP}
      className="space-y-3 sm:space-y-4 py-2 sm:py-3"
    >
      {/* <div className="text-center mb-3 sm:mb-4">
        <CheckCircle className="mx-auto mb-2 text-yellow-400" size={28} />
        <h3 className="text-base sm:text-lg font-semibold text-yellow-400">
          {t("auth.emailVerification.enterOtp")}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 px-2 break-words">
          {t("auth.emailVerification.enterOtpDescription", { email: verificationEmail })}
        </p>
      </div> */}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="otp-input"
          className="text-gray-300 text-sm sm:text-base"
        >
          {t("auth.emailVerification.enterOtp")}
        </Label>
        <Input
          id="otp-input"
          type="text"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            setOtp(value);
            if (errors.otp) {
              setErrors((prev) => ({ ...prev, otp: "" }));
            }
          }}
          maxLength={6}
          required
          className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 text-center text-lg sm:text-xl tracking-widest ${
            errors.otp
              ? "border-red-500 focus:border-red-400"
              : "focus:border-yellow-500"
          }`}
          placeholder={t("auth.emailVerification.otpPlaceholder")}
        />
        {errors.otp && (
          <p className="text-red-400 text-xs mt-1">{errors.otp}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetModal();
            setCurrentStep("email");
          }}
          className="flex-1 border bg-transparent border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors text-sm py-2 sm:py-3"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("auth.emailVerification.backToEmail")}
        </Button>

        <Button
          type="submit"
          disabled={isLoadingVerification}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-sm sm:text-base py-2 sm:py-3"
        >
          {isLoadingVerification ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("auth.emailVerification.verifying")}
            </>
          ) : (
            t("auth.emailVerification.verifyOtpButton")
          )}
        </Button>
      </div>

      <div className="text-center">
        {resendCountdown > 0 ? (
          <p className="text-xs sm:text-sm text-gray-400">
            {t("auth.emailVerification.resendCountdown", {
              seconds: resendCountdown,
            })}
          </p>
        ) : (
          <Button
            type="button"
            variant="link"
            onClick={handleResendOTP}
            disabled={isLoadingVerification}
            className="text-yellow-400 hover:text-yellow-300 p-0 h-auto text-sm sm:text-base"
          >
            {t("auth.emailVerification.resendOtp")}
          </Button>
        )}
      </div>
    </form>
  );

  const renderRegistrationForm = () => (
    <form onSubmit={handleRegister} className="space-y-4 py-4">
      <div className="text-center mb-4">
        <CheckCircle className="mx-auto mb-2 text-green-400" size={32} />
        <p className="text-sm text-green-400">
          {t("auth.register.emailVerified", { email: verificationEmail })}
        </p>
      </div>

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

      {/* Email Field (Read-only) */}
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
          readOnly
          className="bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed"
        />
      </div>

      {/* Password Field */}
      <div>
        <Label
          htmlFor="password-modal"
          className="flex items-center space-x-2 text-yellow-400 mb-2"
        >
          <Lock className="w-4 h-4" />
          <span>{t("auth.register.password")}</span>
        </Label>
        <div className="relative">
          <Input
            id="password-modal"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
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
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400">
                {t("auth.register.passwordStrength")}
              </span>
              <span
                className={`font-medium ${
                  passwordStrength === 0
                    ? "text-red-400"
                    : passwordStrength === 1
                    ? "text-orange-400"
                    : passwordStrength === 2
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {strengthLabels[Math.max(0, passwordStrength - 1)]}
              </span>
            </div>
            <div className="flex space-x-1 mt-1">
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
            autoComplete="new-password"
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

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetModal();
            setCurrentStep("email");
            setIsEmailVerified(false);
          }}
          className="flex-1 bg-transparent border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors text-sm py-2 sm:py-3"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("auth.register.changeEmail")}
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("auth.register.registering")}
            </>
          ) : (
            t("auth.register.registerButton")
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <Dialog
      open={activeModal === "register"}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeAuthModal();
          resetModal();
        }
      }}
    >
      <DialogContent className="w-[95vw] max-w-[425px] bg-gray-900 border-yellow-500/30 text-gray-100 max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-yellow-400">
            {t("auth.register.title")}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-400">
            {currentStep === "email" &&
              t("auth.emailVerification.enterEmailDescription")}
            {currentStep === "otp" &&
              t("auth.emailVerification.enterOtpDescription", {
                email: verificationEmail,
              })}
            {currentStep === "form" && t("auth.register.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {/* Error Message */}
        {/* {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-start gap-2"
          >
            <AlertCircle
              size={16}
              className="text-red-400 mt-0.5 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-red-400 text-sm">{message}</p>
              <div className="mt-1">
                {Object.keys(errors).map((key) =>
                  errors[key] ? (
                    <p key={key} className="text-red-400 text-xs break-words">
                      • {errors[key]}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          </motion.div>
        )} */}

        {/* Success Message */}
        {message && !Object.keys(errors).length && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4"
          >
            <p className="text-green-400 text-sm break-words">{message}</p>
          </motion.div>
        )}

        {/* Render current step */}
        {currentStep === "email" && renderEmailVerificationStep()}
        {currentStep === "otp" && renderOTPVerificationStep()}
        {currentStep === "form" && renderRegistrationForm()}

        <DialogFooter className="sm:justify-center">
          <p className="text-xs sm:text-sm text-gray-400 text-center px-2">
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
