import { createToken, generatePasswordWithSalt } from "../../core/security"
import { TimeTravellerDataSource } from "../../data/source"
import { LoginInputModel, LoginResponseModel } from "../model"
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
    let lastLoggedIn
    const localeDateTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: "America/Sao_Paulo"
    })
    
    if (last_login_at) {
      lastLoggedIn = localeDateTime.format(last_login_at)
    } else { lastLoggedIn = "This is the first time accessing."}
    
    const token = createToken({ timeTraveller: { id, name, passport, birth } })
    
    await this.repository.loginUpdateOrUpdate(timeTraveller)
    //TODO const não usada, mas necessária para registtro no db

    return {
      token,
      timeTraveller,
      lastLoginAt: lastLoggedIn
    }
  }
}
