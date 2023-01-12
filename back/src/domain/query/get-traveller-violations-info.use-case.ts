import { TimeTravellerDataSource, ViolationDataSource } from "@data/source"
import {
  GetTravellerViolationsInputModel,
  TravellerViolationModel
} from "@domain/model"

export class GetTravellerViolationsInfoUseCase {
  private readonly timeTravellerRepository = new TimeTravellerDataSource()
  private readonly violationRepository = new ViolationDataSource()

  async exec(
    data: GetTravellerViolationsInputModel
  ): Promise<TravellerViolationModel[]> {
    const { passport } = data
    const timeTraveller = await this.timeTravellerRepository.findOneByPassport(
      passport
    )

    if (!timeTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não existe.`)
    }

    const violations = await this.violationRepository.findByTravellerId(
      timeTraveller.id
    )

    if (!violations.length) {
      throw new Error(
        `Usuário com o passaporte nº ${passport} não possui infrações registradas.`
      )
    }

    return violations.map(violation =>
      // data.passport,  é uma lista que retorna, mas não possui o nº do passaporte uma vez só amostrando
      ({
        ...violation,
        severity: violation.severity.grade,
        occurredAt: violation.occurred_at
      })
    )
  }
}
