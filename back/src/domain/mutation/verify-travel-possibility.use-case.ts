import { add, sub } from "date-fns"
import { TimeTravellerDataSource, ViolationDataSource } from "../../data/source"
import {
  TravelPossibilityResponseModel,
  VerifyTimeTravelPossibilityInputModel
} from "../model"

export class VerifyTravelPossibilityUseCase {
  private readonly timeTravellerRepository = new TimeTravellerDataSource()
  private readonly violationRepository = new ViolationDataSource()

  async exec(
    input: VerifyTimeTravelPossibilityInputModel
  ): Promise<TravelPossibilityResponseModel> {
    const { passport, travelDate } = input
    const dateFor = {
      today: new Date(),
      travel: new Date(travelDate)
    }

    if (!dateFor.today.getTime()) {
      throw new Error(`A data ${travelDate} não é válida.`)
    }

    const timeTraveller = await this.timeTravellerRepository.findOneByPassport(
      passport
    )

    if (!timeTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não existe.`)
    }

    if (new Date(timeTraveller.birth) > dateFor.today) {
      return {
        message:
          "Não é possível viajar para antes da data de nascimento de um viajante.",
        possibility: false
      }
    }

    const violations = await this.violationRepository.findByTravellerId(
      timeTraveller.id
    )

    const sumGrades = violations.reduce((acum, { occurred_at, severity }) => {
      const dateOccurred = new Date(occurred_at)
      if (
        dateOccurred < dateFor.today &&
        dateOccurred.getTime() > Date.now() - 3600 * 24 * 365 * 1000
      ) {
        return acum + severity.grade
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

    const dateRange = {
      start: sub(dateFor.today, { years: 1 }),
      end: add(dateFor.today, { years: 1 })
    }

    const violationsOccurredInRange =
      await this.violationRepository.findByDateRange(
        dateRange.start,
        dateRange.end
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
