import { add, sub } from "date-fns"
import { dataORM } from "../../db/dbconfig"
import { TimeTraveller, Violation } from "../../db/entities"

interface VerifyTimeTravelPossibilityInputModel {
  passport: number
  travelDate: string
}

const timeTravellerRepository = dataORM.getRepository(TimeTraveller)
const violationRepository = dataORM.getRepository(Violation)

export const verifyTravelPossibilityUseCase = async (
  _header: never,
  body: { input: VerifyTimeTravelPossibilityInputModel }
) => {
  if (!new Date(body.input.travelDate)?.getTime()) {
    throw new Error(`A data ${body.input.travelDate} não é valida'.`)
  }
  const timeTraveller = await timeTravellerRepository.findOne({
    where: { passport: body.input.passport }
  })
  if (!timeTraveller) {
    throw new Error(
      `Usuário com o passaporte nº ${body.input.passport} não existe.`
    )
  }
  if (new Date(timeTraveller.birth) > new Date(body.input.travelDate)) {
    return {
      message:
        "Não é possível viajar para antes da data de nascimento de um viajante.",
      possibility: false
    }
  }
  const violations = await violationRepository.find({
    where: { time_traveller: timeTraveller },
    relations: ["severity"]
  })
  const sumGrades = violations.reduce((acum, violation) => {
    if (
      new Date(violation.occurred_at) < new Date() &&
      new Date(violation.occurred_at).getTime() >
        Date.now() - 3600 * 24 * 365 * 1000
    ) {
      return acum + violation.severity.grade
    } else {
      return acum
    }
  }, 0)
  if (sumGrades > 12) {
    return {
      message:
        "Não é possível viajar tendo 12 pontos de infração acumulados nos últimos 12 meses.",
      possibility: false
    }
  }
  const startDate = sub(new Date(), { years: 1 })
  const endDate = add(new Date(), { years: 1 })
  const travelRangePossibility = await violationRepository
    .createQueryBuilder("violation")
    .where("violation.occurred_at >= :startDate", { startDate })
    .andWhere("violation.occurred_at <= :endDate", { endDate })
    .getOne()
  if (travelRangePossibility) {
    return {
      message:
        "Não é possível viajar para a data pois há uma violação no periodo de 1 ano.",
      possibility: false
    }
  }

  return {
    message: "É possível viajar para a data requerida.",
    possibility: true
  }
}
