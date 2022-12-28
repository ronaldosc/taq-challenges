import { createToken, generatePasswordWithSalt } from "../../core/security"
import { dataORM } from "../../data/db/dbconfig"
import { TimeTraveller } from "../../data/db/entities"
import { LoginInputModel, LoginResponseModel } from "../model"
require("dotenv").config()

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const loginUseCase = async (input: LoginInputModel
): Promise<LoginResponseModel> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: input.passport },
    select: {
      id: true,
      name: true,
      birth: true,
      passport: true,
      password: true,
      salt: true,
      last_login_at: true
    }
  })

  const salt = timeTraveller?.salt
  const hashedPassword = generatePasswordWithSalt(
    input.password,
    salt ?? "defaultSalt"
  )

  if (timeTraveller?.password !== hashedPassword || !timeTraveller) {
    throw new Error(`Credenciais de usuário inválidas.`)
  }

  const token = createToken({ timeTraveller })

  const updatedTimeTraveller = await timeTravellerRepository.save({
    ...timeTraveller,
    last_login_at: new Date()
  })

  return {
    token,
    timeTraveller,
    lastLoginAt: updatedTimeTraveller.last_login_at.toString()
  }
}
