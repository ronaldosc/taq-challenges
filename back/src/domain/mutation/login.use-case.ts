import { createToken, generatePasswordWithSalt } from "../../core/security"
import { TimeTravellerDataSource } from "../../data/source"
import { LoginInputModel, LoginResponseModel } from "../model"
require("dotenv").config()

export class LoginUseCase {
  readonly repository = new TimeTravellerDataSource()

  async exec(input: LoginInputModel): Promise<LoginResponseModel> {
    const { passport: passpt, password: passwd } = input,
      timeTraveller = await this.repository.findOneByPassport(passpt),
      salt = timeTraveller?.salt,
      hashedPassword = generatePasswordWithSalt(passwd, salt ?? "defaultSalt")

    if (timeTraveller?.password !== hashedPassword || !timeTraveller) {
      throw new Error(`Credenciais de usuário inválidas.`)
    }
    const { id, name, passport, birth } = timeTraveller,
      token = createToken({ timeTraveller: { id, name, passport, birth } }),
      updatedTimeTraveller = await this.repository.save(timeTraveller)

    return {
      token,
      timeTraveller,
      lastLoginAt: updatedTimeTraveller.last_login_at.toString()
    }
  }
}
