import { createToken, generatePasswordWithSalt } from "@security"
import { TimeTravellerDataSource } from "@data/source"
import { LoginInputModel, LoginResponseModel } from "@domain/model"
require("dotenv").config()

export class LoginUseCase {
  private readonly repository = new TimeTravellerDataSource()

  async exec(input: LoginInputModel): Promise<LoginResponseModel> {
    const { passport: passpt, password } = input
    const timeTraveller = await this.repository.findOneByPassport(passpt)
    const salt = timeTraveller?.salt
    const hashedPassword = generatePasswordWithSalt(
      password,
      salt ?? "defaultSalt"
    )

    if (timeTraveller?.password !== hashedPassword || !timeTraveller) {
      throw new Error(`Credenciais de usuário inválidas.`)
    }

    const { id, name, passport, birth, last_login_at } = timeTraveller
    const localeDateTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: "America/Sao_Paulo"
    })
    let lastLoggedIn: string

    if (last_login_at) {
      lastLoggedIn = localeDateTime.format(last_login_at)
    } else {
      lastLoggedIn = "Este é o primeiro acesso."
    }

    const token = createToken({ timeTraveller: { id, name, passport, birth } })

    await this.repository.loginUpset(timeTraveller)

    return {
      token,
      timeTraveller,
      lastLoginAt: lastLoggedIn
    }
  }
}
