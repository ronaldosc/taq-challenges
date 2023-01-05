import { add, sub } from "date-fns"
import { TimeTravellerDataSource, ViolationDataSource } from "../../data/source"
import {
  TravelPossibilityResponseModel,
  VerifyTimeTravelPossibilityInputModel
} from "../model"

export class VerifyTravelPossibilityUseCase {
  readonly timeTravellerRepository = new TimeTravellerDataSource()
  readonly violationRepository = new ViolationDataSource()

  async exec(
    input: VerifyTimeTravelPossibilityInputModel
  ): Promise<TravelPossibilityResponseModel> {
    const { passport, travelDate } = input

    if (!new Date(travelDate)?.getTime()) {
      throw new Error(`A data ${travelDate} não é válida.`)
    }

    const timeTraveller = await this.timeTravellerRepository.findOneByPassport(
      passport
    )

    if (!timeTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não existe.`)
    }

    if (new Date(timeTraveller.birth) > new Date(travelDate)) {
      return {
        message:
          "Não é possível viajar para antes da data de nascimento de um viajante.",
        possibility: false
      }
    }

    const violations = await this.violationRepository.findByTravellerId(
      timeTraveller.id
    )

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

    const rangeDates = {
        start: sub(new Date(), { years: 1 }),
        end: add(new Date(), { years: 1 })
      },
      violationsOccurredInRange =
        await this.violationRepository.findByDateRange(
          rangeDates.start,
          rangeDates.end
        )

    if (violationsOccurredInRange) {
      return {
        message:
          "Não é possível viajar para a data indicada, pois há ao menos um registro de violação no período de 1 ano antes e após ela.",
        possibility: false
      }
    }

    return {
      message: "É possível viajar para a data requerida.",
      possibility: true
    }
  }
}
