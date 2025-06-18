"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Loader2, AlertCircle, Mail, ArrowLeft, Send, CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { apiClient } from "@/lib/api"

export default function ForgotPasswordModal() {
  const { t } = useTranslation(["common", "auth"])
  const { activeModal, closeAuthModal, openLoginModal } = useAuth()

  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage("")

    try {
      const response = await apiClient.post("/auth/forgot-password", { email })

      if (response.data.success) {
        setIsSuccess(true)
        setMessage(response.data.message)
      } else {
        setErrors(response.data.errors || {})
        setMessage(response.data.message || t("common:common.error"))
      }
    } catch (error: any) {
      setErrors(error.response?.data?.errors || {})
      setMessage(error.response?.data?.message || t("common:common.connectionError"))
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  const switchToLogin = () => {
    setEmail("")
    setErrors({})
    setMessage("")
    setIsSuccess(false)
    openLoginModal()
  }

  const resetForm = () => {
    setIsSuccess(false)
    setEmail("")
    setMessage("")
    setErrors({})
  }

  return (
    <Dialog
      open={activeModal === "forgot-password"}
      onOpenChange={(isOpen) => {
        if (!isOpen) closeAuthModal()
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-yellow-500/30 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            {isSuccess ? t("auth:auth.forgotPassword.emailSentTitle") : t("auth:auth.forgotPassword.title")}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isSuccess ? "" : t("auth:auth.forgotPassword.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <div className="space-y-4 text-gray-300">
              <p>{message}</p>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">{t("auth:auth.forgotPassword.checkEmailTitle")}</h3>
                <ul className="text-sm text-blue-300 space-y-1 text-left">
                  <li>{t("auth:auth.forgotPassword.checkInbox")}</li>
                  <li>{t("auth:auth.forgotPassword.checkSpam")}</li>
                  <li>{t("auth:auth.forgotPassword.linkExpiry")}</li>
                  <li>{t("auth:auth.forgotPassword.oneTimeUse")}</li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  <strong>{t("auth:auth.forgotPassword.tipTitle")}</strong> {t("auth:auth.forgotPassword.tipContent")}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 mt-6">
              <Button onClick={resetForm} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                {t("auth:auth.forgotPassword.resendEmail")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-400 mb-2">{t("auth:auth.forgotPassword.noteTitle")}</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>{t("auth:auth.forgotPassword.noteExpiry")}</li>
                <li>{t("auth:auth.forgotPassword.noteOneTime")}</li>
                <li>{t("auth:auth.forgotPassword.noteSpam")}</li>
              </ul>
            </div>

            {/* Error Message */}
            {message && Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2"
              >
                <AlertCircle size={18} className="text-red-400" />
                <p className="text-red-400 text-sm">{message}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div>
                <Label htmlFor="email-forgot-modal" className="flex items-center space-x-2 text-yellow-400 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>{t("auth:auth.forgotPassword.email")}</span>
                </Label>
                <Input
                  id="email-forgot-modal"
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`bg-gray-800/70 border-gray-700 text-white placeholder-gray-500 ${
                    errors.email ? "border-red-500 focus:border-red-400" : "focus:border-yellow-500"
                  }`}
                  placeholder={t("auth:auth.forgotPassword.emailPlaceholder")}
                  required
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t("auth:auth.forgotPassword.sendButton")}
                  </>
                )}
              </Button>
            </form>
          </>
        )}

        <DialogFooter className="sm:justify-center">
          <button
            onClick={switchToLogin}
            className="flex items-center justify-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("auth:auth.forgotPassword.backToLogin")}</span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
