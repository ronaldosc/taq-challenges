import * as crypto from "node:crypto"
require("dotenv").config()

export const generateRandomSalt = (): string => {
  return crypto.randomBytes(keyLength).toString("hex")
}
const keyLength = Number(process.env.CRYPTO_KEY_LENGTH!)
const defaultSalt = process.env.CRYPTO_SECRET!

export const generatePasswordWithSalt = (
  value: string,
  salt: string
): string => {
  if (!salt.length) {
    throw new Error("Invalid salt")
  }
  const generateHash = (value: string): string => {
    return crypto.scryptSync(value, defaultSalt, 64).toString("base64")
  }
  const passwordWithSalt = value + salt

  return generateHash(passwordWithSalt)
}
