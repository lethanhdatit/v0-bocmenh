import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.ENCRYPTION_SECRET || "your-secret-key-here"

export function encryptData(data: any): string {
  const jsonString = JSON.stringify(data)
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString()
}

export function decryptData(encryptedData: string): any {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedString)
}
