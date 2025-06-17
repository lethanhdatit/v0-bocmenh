"use client"

import type React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { FormControl, FormLabel, Input, Textarea, Button, Box, Heading, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"
import { Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

interface DreamFormValues {
  title: string
  description: string
}

const DreamForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DreamFormValues>()
  const router = useRouter()
  const t = useTranslations("DreamForm")
  const toast = useToast()
  const pathname = usePathname()

  const onSubmit: SubmitHandler<DreamFormValues> = async (data) => {
    try {
      const response = await fetch("/api/dreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: t("success"),
          description: t("dream_saved"),
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        reset()
        router.push(pathname) // Refresh the page to show the new dream
      } else {
        toast({
          title: t("error"),
          description: t("error_saving"),
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error saving dream:", error)
      toast({
        title: t("error"),
        description: t("error_saving"),
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading size="md" mb={4}>
        {t("add_dream")}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">{t("title")}</FormLabel>
          <Input
            id="title"
            placeholder={t("title_placeholder")}
            {...register("title", { required: t("title_required") })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">{t("description")}</FormLabel>
          <Textarea
            id="description"
            placeholder={t("description_placeholder")}
            {...register("description", { required: t("description_required") })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </FormControl>

        <Button colorScheme="blue" type="submit">
          {t("save")}
        </Button>
        <Link as={NextLink} href={pathname} ml={2}>
          {t("cancel")}
        </Link>
      </form>
    </Box>
  )
}

export default DreamForm
