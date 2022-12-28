import { TimeTravellerDataSource, ViolationDataSource } from "../../data/source"
import { GetTravellerViolationsInputModel, ViolationModel } from "../model"

export const getTravellerViolationsInfoUseCase = async (
  data: GetTravellerViolationsInputModel
): Promise<ViolationModel[]> => {
  const timeTravellerRepository = new TimeTravellerDataSource()
  const violationRepository = new ViolationDataSource()

  const timeTraveller = await timeTravellerRepository.findOneByPassport(
    data.passport
  )

  if (!timeTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${data.passport} já possui cadastro.`
    )
  }
  const violations = await violationRepository.findByTravellerId(
    timeTraveller.id
  )

  return violations.map(violation => ({
    ...violation,
    severity: violation.severity.grade
  }))
}
