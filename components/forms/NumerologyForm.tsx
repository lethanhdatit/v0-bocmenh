"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import type { Dayjs } from "dayjs"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import "dayjs/locale/vi"
import "dayjs/locale/en"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"

type NumerologyFormProps = {}

const NumerologyForm: React.FC<NumerologyFormProps> = () => {
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null)
  const [fullName, setFullName] = useState("")
  const router = useRouter()
  const t = useTranslations("NumerologyForm")
  const { locale } = router
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!birthDate || !fullName) {
      alert(t("missingFields"))
      return
    }

    const birthDateString = birthDate.format("YYYY-MM-DD")
    const encodedFullName = encodeURIComponent(fullName)

    router.push({
      pathname: `/${locale}/numerology/result`,
      query: { birthDate: birthDateString, fullName: encodedFullName },
    })
  }

  const handleDateChange = (date: Dayjs | null) => {
    setBirthDate(date)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        {t("title")}
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="fullName"
        label={t("fullNameLabel")}
        name="fullName"
        autoComplete="name"
        autoFocus
        value={fullName}
        onChange={handleNameChange}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale === "vi" ? "vi" : "en"}>
        <DatePicker
          label={t("birthDateLabel")}
          value={birthDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} margin="normal" required fullWidth />}
          locale={locale}
        />
      </LocalizationProvider>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t("submitButton")}
      </Button>
      <Box mt={2}>
        <Link href={`/${locale}/`}>{t("backToHome")}</Link>
      </Box>
    </Box>
  )
}

export default NumerologyForm
