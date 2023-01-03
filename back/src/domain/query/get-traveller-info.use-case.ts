import { TimeTravellerDataSource } from "../../data/source"
import { GetTravellerInfoInputModel, TimeTravellerModel } from "../model"

export const getTravellerInfoUseCase = async (
  data: GetTravellerInfoInputModel
): Promise<TimeTravellerModel> => {
  const repository = new TimeTravellerDataSource()

  const getTraveller = await repository.findOneByPassport(data.passport)

  if (!getTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${data.passport} não cadastrado.`
    )
  }

  return getTraveller
}
