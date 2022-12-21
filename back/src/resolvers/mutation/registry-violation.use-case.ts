import { dataORM } from "../../db/dbconfig"
import { InfractionSeverity, TimeTraveller, Violation } from "../../db/entities"

interface ViolationModel {
  id: string
  description: string
  severity: number
}
interface RegistryViolationInputModel {
  passport: number
  description: string
  occurredAt: Date
  severity: number
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)
const violationRepository = dataORM.getRepository(Violation)
const severityRepository = dataORM.getRepository(InfractionSeverity)

export const registryViolationUseCase = async (
  _header: never,
  body: { input: RegistryViolationInputModel }
): Promise<ViolationModel> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: body.input.passport }
  })
  if (!timeTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${body.input.passport} não existe.`
    )
  }
  const severity = await severityRepository.findOne({
    where: { grade: body.input.severity }
  })

  if (!severity) {
    throw new Error(
      `Infração com gravidade nível ${body.input.severity} inexistente.`
    )
  }
  const violation = await violationRepository.save({
    description: body.input.description,
    occurred_at: new Date(body.input.occurredAt),
    time_traveller: { id: timeTraveller.id, passport: timeTraveller.passport},
    severity
  })
  return {
    description: violation.description,
    id: violation.id,
    severity: severity.grade
  }
}
