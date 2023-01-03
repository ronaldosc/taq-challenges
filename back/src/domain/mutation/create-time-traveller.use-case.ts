import {
  generatePasswordWithSalt,
  generateRandomSalt
} from "../../core/security";
import { TimeTravellerDataSource } from "../../data/source";
import { CreateTimeTravellerInputModel } from "../model";

export const createTimeTravellerUseCase = async (
  input: CreateTimeTravellerInputModel
) => {
  const repository = new TimeTravellerDataSource();

  const traveller = await repository.findOneByPassport(input.passport);

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

  return repository.save({
    name: input.name,
    birth: new Date(input.birth).toJSON(),
    passport: input.passport,
    password: hashedPassword,
    salt
  })
}
