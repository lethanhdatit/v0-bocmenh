"use client"

import { useAuth } from "@/contexts/AuthContext"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import ForgotPasswordModal from "./ForgotPasswordModal"

export default function AuthModals() {
  const { activeModal } = useAuth()

  return (
    <>
      {activeModal === "login" && <LoginModal />}
      {activeModal === "register" && <RegisterModal />}
      {activeModal === "forgot-password" && <ForgotPasswordModal />}
    </>
  )
}
