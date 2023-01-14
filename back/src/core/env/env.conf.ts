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
    /* switch (envVar) {
case CRYPTO_KEY_LENGTH:
if (env.CRYPTO_KEY_LENGTH) {
Container.set(CRYPTO_KEY_LENGTH, +env.CRYPTO_KEY_LENGTH)
} else {
throw new Error("CRYPTO_KEY_LENGTH env var is not set")
}
break
case CRYPTO_SECRET:
if (env.CRYPTO_SECRET) {
Container.set(CRYPTO_SECRET, env.CRYPTO_SECRET)
} else {
throw new Error("CRYPTO_SECRET env var is not set")
}
break
case PATHTO:
if (env.PATHTO) {
Container.set(PATHTO, env.PATHTO)
} else {
throw new Error("PATHTO env var is not set")
}
break
case PORT:
if (env.PORT) {
Container.set(PORT, +env.PORT)
} else {
throw new Error("PORT env var is not set")
}
break
case HOST:
if (env.HOST) {
Container.set(HOST, env.HOST)
} else {
throw new Error("HOST env var is not set")
}
break
case SECRET:
if (env.SECRET) {
Container.set(SECRET, env.SECRET)
} else {
throw new Error("SECRET env var is not set")
}
break
case DB_SCHEME:
if (env.DB_SCHEME) {
Container.set(DB_SCHEME, env.DB_SCHEME)
} else {
throw new Error("DB_SCHEME env var is not set")
}
break
case DB_USER:
if (env.DB_USER) {
Container.set(DB_USER, env.DB_USER)
} else {
throw new Error("DB_USER env var is not set")
}
break
case DB_PASS:
if (env.DB_PASS) {
Container.set(DB_PASS, env.DB_PASS)
} else {
throw new Error("DB_PASS env var is not set")
}
break
case DB_HOST:
if (env.DB_HOST) {
Container.set(DB_HOST, env.DB_HOST)
} else {
throw new Error("DB_HOST env var is not set")
}
break
case DB_PORT:
if (env.DB_PORT) {
Container.set(DB_PORT, env.DB_PORT)
} else {
throw new Error("DB_PORT env var is not set")
}
break
case DB_DATABASE:
if (env.DB_DATABASE) {
Container.set(DB_DATABASE, env.DB_DATABASE)
} else {
throw new Error("DB_DATABASE env var is not set")
}
break
}
*/


/* import { Container, Token } from "typedi";
import * as dotenv from "dotenv";

export let envKeys  
export const CRYPTO_KEY_LENGTH = new Token<number>("CRYPTO_KEY_LENGTH");
export const CRYPTO_SECRET = new Token<string>("CRYPTO_SECRET");
export const PATHTO = new Token<string>("PATHTO");
export const PORT = new Token<number>("PORT");
export const HOST = new Token<string>("HOST");
export const SECRET = new Token<string>("SECRET");

export namespace EnvConfig {
  export function config() {
    dotenv.config();

    let envValues
    switch (envKeys) {
      case CRYPTO_KEY_LENGTH:
        envKeys = new Token<number>("CRYPTO_KEY_LENGTH"),
        envValues = +env.CRYPTO_KEY_LENGTH!
        break;
        
        default:
          break;
        }
        
        
  Container.set(envKeys, envValues )

    Container.set(envKeys.CRYPTO_KEY_LENGTH, +env.CRYPTO_KEY_LENGTH!);
    Container.set(CRYPTO_SECRET, env.CRYPTO_SECRET!);
    Container.set(PORT, +env.PORT! ?? 3000);
    Container.set(PATHTO, env.PATHTO!);
    Container.set(SECRET, env.SECRET!);
    Container.set(HOST, env.HOST!);
  }
} */
