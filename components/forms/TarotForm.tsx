"use client"

import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { Link } from "next/link"
import { usePathname } from "next/navigation"

// Define the form schema using Zod
const tarotFormSchema = z.object({
  question: z.string().min(10, { message: "Question must be at least 10 characters." }),
  details: z.string().optional(),
})

type TarotFormValues = z.infer<typeof tarotFormSchema>

interface TarotFormProps {
  onSubmit: (data: TarotFormValues) => void
}

const TarotForm: React.FC<TarotFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TarotFormValues>({
    resolver: zodResolver(tarotFormSchema),
  })

  const handleFormSubmit: SubmitHandler<TarotFormValues> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div>
        <Input
          type="text"
          label={t("question")}
          placeholder={t("enter_your_question")}
          {...register("question")}
          errorMessage={errors.question?.message}
        />
      </div>
      <div>
        <Textarea
          label={t("details")}
          placeholder={t("provide_more_details_optional")}
          {...register("details")}
          errorMessage={errors.details?.message}
        />
      </div>
      <div>
        <Button color="primary" type="submit">
          {t("submit")}
        </Button>
      </div>

      {/* Example Link component with locale path */}
      <Link href={`/${locale}/about`}>{t("about_us")}</Link>

      {/* Example Link component with dynamic locale path */}
      <Link href={{ pathname: "/blog/[slug]", query: { slug: "my-first-post" } }} locale={locale}>
        {t("read_blog")}
      </Link>
    </form>
  )
}

export default TarotForm
