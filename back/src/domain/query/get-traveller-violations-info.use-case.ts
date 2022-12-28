import { dataORM } from "../../data/db/dbconfig"
import { TimeTraveller, Violation } from "../../data/db/entities"
import { GetTravellerViolationsInputModel, ViolationModel } from "../model"

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)
const violationRepository = dataORM.getRepository(Violation)

export const getTravellerViolationsInfoUseCase = async (
  data: GetTravellerViolationsInputModel
): Promise<ViolationModel[]> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: data.passport }
  })
  if (!timeTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${data.passport} já possui cadastro.`
    )
  }
  const violations = await violationRepository.find({
    where: { time_traveller: timeTraveller },
    relations: ["time_traveller", "severity"]
  })

  return violations.map(violation => ({
    ...violation,
    severity: violation.severity.grade
  }))
}
