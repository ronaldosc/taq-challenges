import { env } from "node:process"
import { Container, Token } from "typedi"

export const CRYPTO_KEY_LENGTH = new Token<number>("CRYPTO_KEY_LENGTH")
export const CRYPTO_SECRET = new Token<string>("CRYPTO_SECRET")
export const SECRET = new Token<string>("SECRET")
export const TOKEN_EXPIRATION = new Token<string>("TOKEN_EXPIRATION")

export const HOST = new Token<string>("HOST")
export const PATH_TO = new Token<string>("PATH_TO")
export const PORT = new Token<number>("PORT")
export const DATABASE_URL = new Token<string>("DATABASE_URL")

export namespace EnvConfig {
  export function config() {
    require("dotenv").config()
    const envVariables: Token<string | number>[] =
      [
        CRYPTO_KEY_LENGTH, CRYPTO_SECRET, SECRET, TOKEN_EXPIRATION, HOST, PATH_TO, PORT, DATABASE_URL
      ]
    envVariables.forEach(envVar => {
      Container.set(
        envVar,
        envVar instanceof Token<string>
          ? env[envVar.name!]
          : +env[(envVar as Token<number>).name!]!
      )
    })
  }
}
