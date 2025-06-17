"use client"

import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

// Define the schema for the form
const compatibilityFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  deviceType: z.enum(["phone", "tablet", "laptop", "other"], {
    required_error: "You need to select a device type.",
  }),
  description: z
    .string()
    .max(500, {
      message: "Description must be less than 500 characters.",
    })
    .optional(),
})

type CompatibilityFormValues = z.infer<typeof compatibilityFormSchema>

interface CompatibilityFormProps {
  onSubmitSuccess: () => void
}

const CompatibilityForm: React.FC<CompatibilityFormProps> = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompatibilityFormValues>({
    resolver: zodResolver(compatibilityFormSchema),
  })

  const t = useTranslations("CompatibilityForm")
  const router = useRouter()
  const pathname = usePathname()

  const onSubmit: SubmitHandler<CompatibilityFormValues> = async (data) => {
    // Simulate form submission
    console.log("Form data submitted:", data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network request

    // Handle success (e.g., show a success message, redirect)
    onSubmitSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Input
          type="text"
          label={t("nameLabel")}
          placeholder={t("namePlaceholder")}
          {...register("name")}
          errorMessage={errors.name?.message}
        />
      </div>
      <div>
        <Input
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          errorMessage={errors.email?.message}
        />
      </div>
      <div>
        <Select
          label={t("deviceTypeLabel")}
          placeholder={t("deviceTypePlaceholder")}
          {...register("deviceType")}
          errorMessage={errors.deviceType?.message}
        >
          <SelectItem key="phone" value="phone">
            {t("deviceTypePhone")}
          </SelectItem>
          <SelectItem key="tablet" value="tablet">
            {t("deviceTypeTablet")}
          </SelectItem>
          <SelectItem key="laptop" value="laptop">
            {t("deviceTypeLaptop")}
          </SelectItem>
          <SelectItem key="other" value="other">
            {t("deviceTypeOther")}
          </SelectItem>
        </Select>
      </div>
      <div>
        <Textarea
          label={t("descriptionLabel")}
          placeholder={t("descriptionPlaceholder")}
          {...register("description")}
          errorMessage={errors.description?.message}
        />
      </div>
      <div>
        <Button color="primary" type="submit">
          {t("submitButton")}
        </Button>
      </div>
    </form>
  )
}

export default CompatibilityForm
