import CryptoJS from "crypto-js"
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET || "default_secret_key_bocmenh"

export function encryptData(data: any): string {
  const jsonString = JSON.stringify(data)
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString()
}

export function decryptData(encryptedData: string): any {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedString)
}

export function encryptResponse(data: any) {
  const encrypted = encryptData(data);
  return NextResponse.json({ encrypted });
}
