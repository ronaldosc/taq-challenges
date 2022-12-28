import {
  generatePasswordWithSalt,
  generateRandomSalt
} from "../../core/security"
import { dataORM } from "../../data/db/dbconfig"
import { TimeTraveller } from "../../data/db/entities"
import { CreateTimeTravellerInputModel } from "../model"

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const createTimeTravellerUseCase = async (
  input: CreateTimeTravellerInputModel
) => {
  const traveller = await timeTravellerRepository.findOne({
    where: { passport: input.passport }
  })
  if (traveller) {
    throw new Error(
      `Usuário com o passaporte nº ${input.passport} já possui cadastro.`
    )
  }
  if (!new Date(input.birth)?.getTime()) {
    throw new Error(`A data de nascimento ${input.birth} não é válida.`)
  }

  const salt = generateRandomSalt()
  const hashedPassword = generatePasswordWithSalt(input.password, salt)

  return timeTravellerRepository.save({
    name: input.name,
    birth: new Date(input.birth).toJSON(),
    passport: input.passport,
    password: hashedPassword,
    salt
  })
}
