import { repos } from "../../db/dbconfig"

interface GetTravellerInfoInputModel {
  passport: number
}

export default {
  getTravellerInfo: async (
    _header: never,
    body: { data: GetTravellerInfoInputModel }
  ) => {
    const getTraveller = await repos.timeTravellerRepository.findOne({
      where: { passport: body.data.passport }
    })
    if (!getTraveller) {
      throw new Error(
        `Usuário com o passaporte nº ${body.data.passport} não cadastrado.`
      )
    }
    return getTraveller
  }
}
