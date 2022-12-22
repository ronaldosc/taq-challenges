import { dataORM } from "../../db/dbconfig"
import { TimeTraveller } from "../../db/entities"

interface CreateTimeTravellerInputModel {
  name: string
  birth: string
  passport: number
  password: string
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const createTimeTravellerUseCase = async (
  _parent: never,
  body: { input: CreateTimeTravellerInputModel }
) => {
  const traveller = await timeTravellerRepository.findOne({
    where: { passport: body.input.passport }
  })
  if (traveller) {
    throw new Error(
      `Usuário com o passaporte nº ${body.input.passport} já possui cadastro.`
    )
  }
  if (!new Date(body.input.birth)?.getTime()) {
    throw new Error(`A data de nascimento ${body.input.birth} não é válida.`)
  }

  return timeTravellerRepository.save({
    name: body.input.name,
    birth: new Date(body.input.birth).toJSON(),
    passport: body.input.passport,
    password: body.input.password
    // last_login_at: new Date()    esse campo já é populado por default na entidade
  })
}
