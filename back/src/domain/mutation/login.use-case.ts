import { createToken, generatePasswordWithSalt } from "../../core/security";
import { TimeTravellerDataSource } from '../../data/source';
import { LoginInputModel, LoginResponseModel } from "../model";
require("dotenv").config()

export const loginUseCase = async (input: LoginInputModel): Promise<LoginResponseModel> => {
  const repository = new TimeTravellerDataSource();
  const timeTraveller = await repository.findOneByPassport(input.passport);

  const salt = timeTraveller?.salt
  const hashedPassword = generatePasswordWithSalt(
    input.password,
    salt ?? "defaultSalt"
  )

  if (timeTraveller?.password !== hashedPassword || !timeTraveller) {
    throw new Error(`Credenciais de usuário inválidas.`)
  }
  
  const { id, name, passport, birth } = timeTraveller
  const token = createToken({ timeTraveller: { id, name, passport, birth } });

  const updatedTimeTraveller = await repository.save(timeTraveller);

  return {
    token,
    timeTraveller,
    lastLoginAt: updatedTimeTraveller.last_login_at.toString()
  }
}
