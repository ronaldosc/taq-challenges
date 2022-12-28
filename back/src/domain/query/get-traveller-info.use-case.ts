import { dataORM } from "../../data/db/dbconfig"
import { TimeTraveller } from "../../data/db/entities"
import { GetTravellerInfoInputModel, TimeTravellerModel } from "../model"

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)

export const getTravellerInfoUseCase = async (
  data: GetTravellerInfoInputModel
): Promise<TimeTravellerModel> => {
  const getTraveller = await timeTravellerRepository.findOne({
    where: { passport: data.passport }
  })
  if (!getTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${data.passport} não cadastrado.`
    )
  }
  return getTraveller
}
