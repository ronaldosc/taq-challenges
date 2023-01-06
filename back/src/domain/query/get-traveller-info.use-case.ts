import { TimeTravellerDataSource } from "../../data/source"
import { GetTravellerInfoInputModel, TimeTravellerModel } from "../model"

export class GetTravellerInfoUseCase {
  private readonly repository = new TimeTravellerDataSource()

  async exec(data: GetTravellerInfoInputModel): Promise<TimeTravellerModel> {
    const { passport } = data
    const getTraveller = await this.repository.findOneByPassport(passport)

    if (!getTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não cadastrado.`)
    }

    return getTraveller
  }
}
