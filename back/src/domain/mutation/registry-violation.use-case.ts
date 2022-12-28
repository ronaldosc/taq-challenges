import { dataORM } from "../../data/db/dbconfig"
import {
  InfractionSeverity,
  TimeTraveller,
  Violation
} from "../../data/db/entities"
import { RegistryViolationInputModel, ViolationModel } from "../model"

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)
const violationRepository = dataORM.getRepository(Violation)
const severityRepository = dataORM.getRepository(InfractionSeverity)

export const registryViolationUseCase = async (
  input: RegistryViolationInputModel
): Promise<ViolationModel> => {
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: input.passport }
  })
  if (!timeTraveller) {
    throw new Error(`Usuário com o passaporte nº ${input.passport} não existe.`)
  }
  const severity = await severityRepository.findOne({
    where: { grade: input.severity }
  })

  if (!severity) {
    throw new Error(
      `Infração com gravidade nível ${input.severity} inexistente.`
    )
  }
  const violation = await violationRepository.save({
    description: input.description,
    occurred_at: new Date(input.occurredAt),
    time_traveller: { id: timeTraveller.id, passport: timeTraveller.passport },
    severity
  })
  return {
    description: violation.description,
    id: violation.id,
    severity: severity.grade
  }
}
