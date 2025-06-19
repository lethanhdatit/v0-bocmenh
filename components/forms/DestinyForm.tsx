"use client"

import { useState, type FormEvent, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Stars, Calendar, Clock, User, Loader2, AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { apiClient, type ApiBaseResponse } from "@/lib/api/apiClient" // Use our apiClient

export default function DestinyForm() {
  const { t } = useTranslation() // Ensure "destiny" namespace is loaded
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialized = useRef(false)

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Only initialize from URL params once when component mounts
  useEffect(() => {
    if (!isInitialized.current) {
      setName(searchParams.get("name") || "")
      setBirthDate(searchParams.get("birthDate") || "")
      setBirthTime(searchParams.get("birthTime") || "")
      isInitialized.current = true
    }
  }, [searchParams])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()  
    setFormError(null)
    if (!name.trim() || !birthDate) {
      setFormError(t("destiny.form.validationError")) // Use namespace
      return
    }
    setIsLoading(true)

    try {
      // Data for the POST request
      const postData = {
        name: name.trim(),
        birthDate,
        birthTime: birthTime || undefined,
      }

      // apiClient.post will be intercepted if auth is required
      // The interceptor handles prompting login and retrying the request.
      // If successful (either initially or after retry), it proceeds.
      // The destiny API POST doesn't return data, it just processes.
      // We then navigate to the results page.
      await apiClient.post("/destiny", postData)

      // Construct query params for the results page (GET request)
      const pageParams = new URLSearchParams()
      pageParams.set("name", name.trim())
      pageParams.set("birthDate", birthDate)
      if (birthTime) {
        pageParams.set("birthTime", birthTime)
      }
      // Navigate to the destiny page which will then fetch results based on these params
      router.push(`/destiny?${pageParams.toString()}`)
    } catch (err: any) {
      const apiError = await err.json();
      setFormError(apiError?.message ?? apiError?.errors?.general ?? t("common.errorUnexpected"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
          {t("destiny.form.title")}
        </CardTitle>
        <CardDescription className="text-gray-300 mt-1">{t("destiny.form.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        {formError && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-sm flex items-center gap-2">
            <AlertCircle size={18} /> {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5">
              <User className="w-5 h-5" />
              <span>{t("destiny.form.nameLabel")}</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800/70 border-gray-700 hover:border-yellow-600/70 focus:border-yellow-500 focus:ring-yellow-500/50 text-white placeholder-gray-500 rounded-lg transition-colors"
              placeholder={t("destiny.form.namePlaceholder")}
            />
          </div>
          <div>
            <Label htmlFor="birthDate" className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5">
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
            <Label htmlFor="birthTime" className="flex items-center space-x-2 text-yellow-400 font-medium mb-1.5">
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
            <p className="text-xs text-gray-400 mt-1">{t("destiny.form.birthTimeHint")}</p>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-gray-900 font-semibold py-3.5 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2.5"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Stars className="w-6 h-6" />}
            <span>{isLoading ? t("common.processing") : t("destiny.form.submitButton")}</span>
          </Button>
        </form>
      </CardContent>
      {isLoading && (
        <CardFooter className="flex justify-center pt-4 border-t border-gray-700/50">
          <p className="text-sm text-yellow-300 animate-pulse">{t("destiny.form.loadingMessagePage")}</p>
        </CardFooter>
      )}
    </Card>
  )
}
