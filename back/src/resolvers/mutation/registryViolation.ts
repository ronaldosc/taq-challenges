import { repos } from "../../db/dbconfig"

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

export default {
  registryViolation: async (
    _header: never,
    body: { input: RegistryViolationInputModel }
  ): Promise<ViolationModel> => {
    const timeTraveller = await repos.timeTravellerRepository.findOne({
      where: { passport: body.input.passport }
    })
    if (!timeTraveller) {
      throw new Error(
        `Usuário com o passaporte nº ${body.input.passport} não existe.`
      )
    }
    const severity = await repos.severityRepository.findOne({
      where: { grade: body.input.severity }
    })
    if (!severity) {
      throw new Error(
        `Infração com gravidade nível ${body.input.severity} inexistente.`
      )
    }
    const violation = await repos.violationRepository.save({
      description: body.input.description,
      occurred_at: new Date(body.input.occurredAt),
      time_traveller: { id: timeTraveller.id },
      severity
    })
    return {
      description: violation.description,
      id: violation.id,
      severity: severity.grade
    }
  }
}
