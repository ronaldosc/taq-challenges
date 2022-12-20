import { dataORM } from "../../db/dbconfig"
import { TimeTraveller } from "../../db/entities"

interface GetTravellerInfoInputModel {
  passport: number
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const getTravellerInfoUseCase = async (
    _header: never,
    body: { data: GetTravellerInfoInputModel }
    ) => {
        const getTraveller = await timeTravellerRepository.findOne({
            where: { passport: body.data.passport }
    })
    if (!getTraveller) {
      throw new Error(
        `Usuário com o passaporte nº ${body.data.passport} não cadastrado.`
      )
    }
    return getTraveller
  }
