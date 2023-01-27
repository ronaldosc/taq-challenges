import { CRYPTO_KEY_LENGTH, CRYPTO_SECRET } from "@env"
import crypto from "node:crypto"
import { Inject, Service } from "typedi"

@Service()
export class CryptoService {
  constructor(
    @Inject(CRYPTO_SECRET) private defaultSalt: string,
    @Inject(CRYPTO_KEY_LENGTH) private keyLength: number
  ) {}

  public generateRandomSalt(): string {
    return crypto.randomBytes(+this.keyLength).toString("hex")
  }

  public generatePasswordWithSalt(value: string, salt: string): string {
    if (!salt.length) {
      throw new Error("Invalid salt")
    }

    const passwordWithSalt = value + salt

    return this.generateHash(passwordWithSalt)
  }

  private generateHash(value: string): string {
    return crypto.scryptSync(value, this.defaultSalt, 64).toString("base64")
  }
}
