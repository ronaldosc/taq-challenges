import * as dotenv from "dotenv"
import { env } from "node:process"
import { Container, Token } from "typedi"

export const CRYPTO_KEY_LENGTH = new Token<number>("CRYPTO_KEY_LENGTH")
export const CRYPTO_SECRET = new Token<string>("CRYPTO_SECRET")
export const SECRET = new Token<string>("SECRET")
export const HOST = new Token<string>("HOST")
export const PATHTO = new Token<string>("PATHTO")
export const PORT = new Token<number>("PORT")

export const DB_SCHEME = new Token<string>("DB_SCHEME")
export const DB_USER = new Token<string>("DB_USER")
export const DB_PASS = new Token<string>("DB_PASS")
export const DB_HOST = new Token<string>("DB_HOST")
export const DB_PORT = new Token<number>("DB_PORT")
export const DB_DATABASE = new Token<string>("DB_DATABASE")

export namespace EnvConfig {
  export function config() {
    dotenv.config()
    const envVariables: Token<string | number>[] =
      [
        CRYPTO_KEY_LENGTH, CRYPTO_SECRET, SECRET, HOST, PATHTO, PORT,
        DB_SCHEME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DATABASE
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
