"use client"

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
import { Loader2, AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import Link from "next/link"

export default function LoginModal() {
  const { t } = useTranslation(["common", "auth"])
  const { isLoginPromptActive, closeLoginPrompt, processLogin, isLoading } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = await processLogin(email, password, rememberMe)
    if (!result.success) {
      setError(result.message || t("auth:auth.login.loginFailed"))
    } else {
      // Success is handled by AuthContext (closing modal, running callbacks)
      setEmail("") // Reset form
      setPassword("")
    }
  }

  if (!isLoginPromptActive) {
    return null
  }

  return (
    <Dialog
      open={isLoginPromptActive}
      onOpenChange={(isOpen) => {
        if (!isOpen) closeLoginPrompt()
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-yellow-500/30 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">{t("auth:auth.login.titleModal")}</DialogTitle>
          <DialogDescription className="text-gray-400">{t("auth:auth.login.subtitleModal")}</DialogDescription>
        </DialogHeader>
        {error && (
          <div className="my-2 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-sm flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4 py-4">
          <div>
            <Label htmlFor="email-modal" className="text-yellow-400">
              {t("auth:auth.login.emailLabel")}
            </Label>
            <Input
              id="email-modal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800/70 border-gray-700 text-white placeholder-gray-500"
              placeholder={t("auth:auth.login.emailPlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="password-modal" className="text-yellow-400">
              {t("auth:auth.login.passwordLabel")}
            </Label>
            <Input
              id="password-modal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800/70 border-gray-700 text-white placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe-modal"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-600"
              />
              <Label htmlFor="rememberMe-modal" className="text-sm text-gray-300 cursor-pointer">
                {t("auth:auth.login.rememberMe")}
              </Label>
            </div>
            <Link href="/auth/forgot-password" legacyBehavior>
              <a onClick={closeLoginPrompt} className="text-sm text-yellow-400 hover:text-yellow-300 hover:underline">
                {t("auth:auth.login.forgotPasswordLink")}
              </a>
            </Link>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
            {isLoading ? <Loader2 className="animate-spin" /> : t("auth:auth.login.loginButton")}
          </Button>
        </form>
        <DialogFooter className="sm:justify-center">
          <p className="text-sm text-gray-400">
            {t("auth:auth.login.noAccount")}{" "}
            <Link href="/auth/register" legacyBehavior>
              <a
                onClick={closeLoginPrompt}
                className="font-medium text-yellow-400 hover:text-yellow-300 hover:underline"
              >
                {t("auth:auth.login.registerLink")}
              </a>
            </Link>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
