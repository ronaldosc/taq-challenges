import { TimeTravellerDataSource } from "@data/source"
import { GetTravellerInfoInputModel, TimeTravellerModel } from "@domain/model"
import { Service } from "typedi"

@Service()
export class GetTravellerInfoUseCase {
  constructor(private readonly repository: TimeTravellerDataSource) {}

  async exec(data: GetTravellerInfoInputModel): Promise<TimeTravellerModel> {
    const { passport } = data
    const getTraveller = await this.repository.findOneByPassport(passport)

    if (!getTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não cadastrado.`)
    }

    return getTraveller
  }
}
