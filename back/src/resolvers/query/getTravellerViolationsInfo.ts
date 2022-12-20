import { repos } from "../../db/dbconfig"

interface ViolationModel {
  id: string
  description: string
  severity: number
}
interface GetTravellerViolationsInputModel {
  passport: number
}

export default {
  getTravellerViolationsInfo: async (
    _header: never,
    body: { data: GetTravellerViolationsInputModel }
  ): Promise<ViolationModel[]> => {
    const timeTraveller = await repos.timeTravellerRepository.findOne({
      where: { passport: body.data.passport }
    })
    if (!timeTraveller) {
      throw new Error(
        `Usuário com o passaporte nº ${body.data.passport} já possui cadastro.`
      )
    }
    const violations = await repos.violationRepository.find({
      where: { time_traveller: timeTraveller },
      relations: ["time_traveller", "severity"]
    })

    return violations.map(violation => ({
      ...violation,
      severity: violation.severity.grade
    }))
  }
}
