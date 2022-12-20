import { repos } from "../../db/dbconfig"

interface CreateTimeTravellerInputModel {
  name: string
  birth: string
  passport: number
}

export default {
  createTimeTraveller: async (
    _header: never,
    body: { input: CreateTimeTravellerInputModel }
  ) => {
    const traveller = await repos.timeTravellerRepository.findOne({
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

    return repos.timeTravellerRepository.save({
      name: body.input.name,
      birth: new Date(body.input.birth).toJSON(),
      passport: body.input.passport
    })
  }
}
