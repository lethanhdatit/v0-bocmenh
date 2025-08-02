"use client";

import { useState, useEffect, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import {
  sendForgotPasswordEmailVerification,
  confirmForgotPasswordEmailVerification,
  resetPassword,
} from "@/lib/emailVerification";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

type ForgotPasswordStep = "email" | "otp" | "resetPassword" | "success";

const WaitToResend = 120;

export default function ForgotPasswordModal() {
  const { t } = useTranslation();
  const { activeModal, closeAuthModal, openLoginModal } = useAuth();

  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>("email");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      const response = await sendForgotPasswordEmailVerification({
        email: verificationEmail,
      });
      if (response.success) {
        setCurrentStep("otp");
        setResendCountdown(WaitToResend); // 5 minutes countdown
        setMessage(t("auth.forgotPassword.otpSent"));
      } else {
        setErrors({
          email: response.message || t("auth.forgotPassword.sendOtpFailed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || t("auth.forgotPassword.systemError");
      const errorCode = error?.response?.data?.beErrorCode;
      const errorMetaData = error?.response?.data?.beErrorMetaData;
      const remainingTime = errorMetaData?.waitTimeInSeconds || WaitToResend;

      if (errorCode === "UserNotFound") {
        setErrors({ email: t("auth.forgotPassword.userNotFound") });
      } else if (errorCode === "SpamEmailSending") {
        setErrors({
          email: t("auth.emailVerification.spamPrevention", { seconds: remainingTime }),
        });
        setResendCountdown(remainingTime);
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
      const response = await confirmForgotPasswordEmailVerification({
        email: verificationEmail,
        otp: otp,
      });

      if (response.success) {
        setIsEmailVerified(true);
        setCurrentStep("resetPassword");
        setFormData((prev) => ({ ...prev, email: verificationEmail }));
        setMessage(t("auth.forgotPassword.otpVerified"));
      } else {
        setErrors({
          otp: response.message || t("auth.forgotPassword.otpVerifyFailed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || t("auth.forgotPassword.systemError");
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
      const response = await sendForgotPasswordEmailVerification({
        email: verificationEmail,
      });
      if (response.success) {
        setResendCountdown(WaitToResend);
        setMessage(t("auth.forgotPassword.otpResent"));
      } else {
        setErrors({
          general: response.message || t("auth.forgotPassword.resendFailed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || t("auth.forgotPassword.systemError");
      setErrors({ general: errorMessage });
    } finally {
      setIsLoadingVerification(false);
    }
  };

  // Handle reset password
  const handleResetPassword = async (e: FormEvent) => {
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

    if (!formData.password || formData.password.length < 6) {
      clientErrors.password = t("auth.register.passwordMinLength");
    }

    if (formData.password !== formData.confirmPassword) {
      clientErrors.confirmPassword = t("auth.register.passwordMismatch");
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsLoadingVerification(true);

    try {
      const response = await resetPassword({
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        setCurrentStep("success");
        setMessage(t("auth.forgotPassword.resetSuccess"));
      } else {
        setErrors({
          general: response.message || t("auth.forgotPassword.resetFailed"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || t("auth.forgotPassword.systemError");
      const errorCode = error?.response?.data?.beErrorCode;
      if (errorCode === "UnverifiedEmail") {
        setErrors({ general: t("auth.forgotPassword.unverifiedEmail") });
        setCurrentStep("email");
        setIsEmailVerified(false);
      } else if (errorCode === "ExpiredEmailVerification") {
        setErrors({ general: t("auth.forgotPassword.verificationExpired") });
        setCurrentStep("email");
        setIsEmailVerified(false);
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsLoadingVerification(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      email: "",
      password: "",
      confirmPassword: "",
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
      autoComplete="on"
    >
      {/* <div className="text-center mb-3 sm:mb-4">
        <Mail className="mx-auto mb-2 text-yellow-400" size={28} />
        <h3 className="text-base sm:text-lg font-semibold text-yellow-400">
          {t("auth.forgotPassword.enterEmailTitle")}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 px-2">
          {t("auth.forgotPassword.enterEmailDescription")}
        </p>
      </div> */}

      <div className="flex flex-col gap-2">
        <Label htmlFor="verification-email" className="text-sm text-gray-300">
          {t("auth.register.emailLabel")}
        </Label>
        <Input
          id="verification-email"
          type="email"
          name="email"
          value={verificationEmail}
          onChange={(e) => {
            setVerificationEmail(e.target.value);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          required
          autoComplete="email username"
          autoCapitalize="none"
          spellCheck="false"
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

      {message && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400 text-sm">
            {message}
          </AlertDescription>
        </Alert>
      )}

      {/* Show delivery info when OTP was sent successfully */}
      {message && (
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Mail className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-400 text-sm space-y-2">
            <p>{t("auth.emailVerification.deliveryInfo")}</p>
            <p className="font-medium">{t("auth.emailVerification.patientWait")}</p>
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isLoadingVerification || !verificationEmail}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingVerification
          ? t("auth.emailVerification.sending")
          : t("auth.forgotPassword.sendOtp")}
      </Button>
    </form>
  );

  const renderOTPVerificationStep = () => (
    <form
      onSubmit={handleVerifyOTP}
      className="space-y-3 sm:space-y-4 py-2 sm:py-3"
    >
      {/* <div className="text-center mb-3 sm:mb-4">
        <Shield className="mx-auto mb-2 text-yellow-400" size={28} />
        <h3 className="text-base sm:text-lg font-semibold text-yellow-400">
          {t("auth.emailVerification.verifyTitle")}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 px-2">
          {t("auth.emailVerification.verifyDescription", {
            email: verificationEmail,
          })}
        </p>
      </div> */}

      <div className="flex flex-col gap-2">
        <Label htmlFor="otp" className="text-sm text-gray-300">
          {t("auth.emailVerification.otpLabel")}
        </Label>
        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={6}
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setOtp(value);
            if (errors.otp) {
              setErrors((prev) => ({ ...prev, otp: "" }));
            }
          }}
          required
          className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 text-center text-lg sm:text-xl tracking-widest ${
            errors.otp
              ? "border-red-500 focus:border-red-400"
              : "focus:border-yellow-500"
          }`}
          placeholder="123456"
        />
        {errors.otp && (
          <p className="text-red-400 text-xs mt-1">{errors.otp}</p>
        )}
      </div>

      {message && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400 text-sm">
            {message}
          </AlertDescription>
        </Alert>
      )}

      {/* Delivery information */}
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Mail className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-400 text-sm space-y-2">
          <p>{t("auth.emailVerification.deliveryInfo")}</p>
          <p className="font-medium">{t("auth.emailVerification.patientWait")}</p>
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={isLoadingVerification || otp.length !== 6}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingVerification
            ? t("auth.emailVerification.verifying")
            : t("auth.emailVerification.verify")}
        </Button>

        <div className="text-center text-xs sm:text-sm text-gray-400">
          {resendCountdown > 0 ? (
            <span>
              {t("auth.emailVerification.resendCountdown", {
                seconds: resendCountdown,
              })}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoadingVerification}
              className="text-yellow-400 hover:text-yellow-300 underline disabled:opacity-50"
            >
              {t("auth.emailVerification.resend")}
            </button>
          )}
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => resetModal()}
        className="w-full text-gray-400 hover:text-base text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("auth.emailVerification.backToEmail")}
      </Button>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-4 py-4" autoComplete="on">
      {/* Hidden field to help browsers associate credentials */}
      <input type="hidden" name="username" value={formData.email} autoComplete="username" />
      
      {/* <div className="text-center mb-4">
        <Lock className="mx-auto mb-2 text-yellow-400" size={28} />
        <h3 className="text-lg font-semibold text-yellow-400">
          {t("auth.forgotPassword.resetPasswordTitle")}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {t("auth.forgotPassword.resetPasswordDescription")}
        </p>
      </div> */}

      {/* New Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-sm text-gray-300">
          {t("auth.register.newPasswordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
            autoCapitalize="none"
            spellCheck="false"
            className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-10 ${
              errors.password
                ? "border-red-500 focus:border-red-400"
                : "focus:border-yellow-500"
            }`}
            placeholder={t("auth.register.passwordPlaceholder")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1">{errors.password}</p>
        )}

        {/* Password strength indicator */}
        {formData.password && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index < passwordStrength
                      ? strengthColors[passwordStrength - 1]
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            {passwordStrength > 0 && (
              <p className="text-xs text-gray-400">
                {t("auth.register.strength")}:{" "}
                {strengthLabels[passwordStrength - 1]}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword" className="text-sm text-gray-300">
          {t("auth.register.confirmPasswordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
            autoCapitalize="none"
            spellCheck="false"
            className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 pr-10 ${
              errors.confirmPassword
                ? "border-red-500 focus:border-red-400"
                : "focus:border-yellow-500"
            }`}
            placeholder={t("auth.register.confirmPasswordPlaceholder")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {errors.general && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400 text-sm">
            {errors.general}
          </AlertDescription>
        </Alert>
      )}

      {message && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400 text-sm">
            {message}
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isLoadingVerification}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingVerification
          ? t("auth.forgotPassword.resetting")
          : t("auth.forgotPassword.resetPassword")}
      </Button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-6">
      <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
      <h3 className="text-lg font-semibold text-green-400 mb-2">
        {t("auth.forgotPassword.successTitle")}
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        {t("auth.forgotPassword.successDescription")}
      </p>

      <Button
        onClick={switchToLogin}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 text-base"
      >
        {t("auth.forgotPassword.backToLogin")}
      </Button>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return t("auth.forgotPassword.title");
      case "otp":
        return t("auth.forgotPassword.verifyTitle");
      case "resetPassword":
        return t("auth.forgotPassword.resetPasswordTitle");
      case "success":
        return t("auth.forgotPassword.successTitle");
      default:
        return t("auth.forgotPassword.title");
    }
  };

  return (
    <Dialog
      open={activeModal === "forgot-password"}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeAuthModal();
          resetModal();
        }
      }}
    >
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg bg-gray-900 border border-gray-700 text-white max-h-[95vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-yellow-400">
            {getStepTitle()}
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm sm:text-base">
            {currentStep === "email" && t("auth.forgotPassword.enterEmailDescription")}
            {currentStep === "otp" && t("auth.emailVerification.enterOtpDescription", { email: verificationEmail })}
            {currentStep === "resetPassword" && t("auth.forgotPassword.resetPasswordDescription")}
            {currentStep === "success" && t("auth.forgotPassword.successDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="px-2 sm:px-4">
          {currentStep === "email" && renderEmailVerificationStep()}
          {currentStep === "otp" && renderOTPVerificationStep()}
          {currentStep === "resetPassword" && renderResetPasswordForm()}
          {currentStep === "success" && renderSuccessStep()}

          {/* Footer */}
          {currentStep !== "success" && (
            <div className="text-center pt-4 border-t border-gray-700 mt-4">
              <p className="text-xs sm:text-sm text-gray-400">
                {t("auth.forgotPassword.rememberPassword")}{" "}
                <button
                  onClick={switchToLogin}
                  className="text-yellow-400 hover:text-yellow-300 underline"
                >
                  {t("auth.forgotPassword.backToLogin")}
                </button>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
