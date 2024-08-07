import { TimeTravellerDataSource, ViolationDataSource } from "@data/source"
import {
  GetTravellerViolationsInputModel,
  TravellerViolationModel
} from "@domain/model"
import { Service } from "typedi"

@Service()
export class GetTravellerViolationsInfoUseCase {
  constructor(
    private readonly timeTravellerRepository: TimeTravellerDataSource,
    private readonly violationRepository: ViolationDataSource
  ) {}

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

    return violations.map(violation => ({
      ...violation,
      severity: violation.severity.grade,
      occurredAt: violation.occurred_at
    }))
  }
}
