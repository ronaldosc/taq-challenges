import jwt from "jsonwebtoken"
import { dataORM } from "../../db/dbconfig"
import { TimeTraveller } from "../../db/entities"
require("dotenv").config()

interface LoginInputModel {
  passport: number
  password: string
}
interface LoginResponseModel {
  token: string
  timeTraveller: TimeTraveller
  lastLoginAt?: string
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const loginUseCase = async (
  _parent: never,
  body: { input: LoginInputModel }
): Promise<LoginResponseModel> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: body.input.passport },
    select: {
      id: true,
      name: true,
      birth: true,
      passport: true,
      password: true,
      last_login_at: true
    }
  })
  if (!timeTraveller || timeTraveller.password !== body.input.password) {
    throw new Error(`Credenciais de usuário inválidas.`)
  }
 
  const secret = process.env.SECRET!   // colocar no SECRET do dotenv
  const expires = "1h"
  const token = jwt.sign({ timeTraveller }, secret, { expiresIn: expires })
  const updatedTimeTraveller = await timeTravellerRepository.save({...timeTraveller, last_login_at: new Date()})

  return {
    token,
    timeTraveller,
    lastLoginAt: (updatedTimeTraveller.last_login_at).toString()
  }
}
