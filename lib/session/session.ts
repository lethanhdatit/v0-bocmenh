"use server"

import { type UserSession, sessionOptions } from "@/lib/session/sessionOptions"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export async function getSession() {
  return getIronSession<UserSession>(await cookies(), sessionOptions)
}
