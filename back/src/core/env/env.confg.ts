import { Container, Token } from "typedi";
import * as dotenv from "dotenv";

export const CRYPTO_KEY_LENGTH = new Token<number>("CRYPTO_KEY_LENGTH");
export const CRYPTO_SECRET = new Token<string>("CRYPTO_SECRET");
export const PATHTO = new Token<string>("PATHTO");
export const PORT = new Token<number>("PORT");
export const HOST = new Token<string>("HOST");
export const SECRET = new Token<string>("SECRET");

export namespace EnvConfig {
  export function config() {
    dotenv.config();

    Container.set(CRYPTO_KEY_LENGTH, +process.env.CRYPTO_KEY_LENGTH!);
    Container.set(CRYPTO_SECRET, process.env.CRYPTO_SECRET!);
    Container.set(PORT, +process.env.PORT! ?? 3000);
    Container.set(PATHTO, process.env.PATHTO!);
    Container.set(SECRET, process.env.SECRET!);
    Container.set(HOST, process.env.HOST!);
  }
}
