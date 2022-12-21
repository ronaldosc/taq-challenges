import { dataORM } from "../../db/dbconfig"
import { TimeTraveller, Violation } from "../../db/entities"

interface ViolationModel {
  id: string
  description: string
  severity: number
}
interface GetTravellerViolationsInputModel {
  passport: number
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)
const violationRepository = dataORM.getRepository(Violation)

export const getTravellerViolationsInfoUseCase = async (
  _parent: never,
  body: { data: GetTravellerViolationsInputModel }
): Promise<ViolationModel[]> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: body.data.passport }
  })
  if (!timeTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${body.data.passport} já possui cadastro.`
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
