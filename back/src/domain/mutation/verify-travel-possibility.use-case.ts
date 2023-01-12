import { TimeTravellerDataSource, ViolationDataSource } from "@data/source"
import {
  TravelPossibilityResponseModel,
  VerifyTimeTravelPossibilityInputModel
} from "@domain/model"
import { addYears, subYears } from "date-fns"

export class VerifyTravelPossibilityUseCase {
  private readonly timeTravellerRepository = new TimeTravellerDataSource()
  private readonly violationRepository = new ViolationDataSource()

  async exec(
    input: VerifyTimeTravelPossibilityInputModel
  ): Promise<TravelPossibilityResponseModel> {
    const { passport, travelDate } = input
    const dateFor = {
      now: Date.now(),
      today: new Date(),
      travel: new Date(travelDate)
    }

    if (!dateFor.travel.getTime()) {
      throw new Error(`A data '${travelDate}' não é válida.`)
    }

    const timeTraveller = await this.timeTravellerRepository.findOneByPassport(
      passport
    )

    if (!timeTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não existe.`)
    }

    if (new Date(timeTraveller.birth) > dateFor.travel) {
      return {
        possibility: false,
        message:
          "Impossível viajar para data anterior ao nascimento do viajante."
      }
    }

    const violations = await this.violationRepository.findByTravellerId(
      timeTraveller.id
    )

    const sumGrades = violations.reduce((acum, violation) => {
      const dateOccurred = new Date(violation.occurred_at)

      if (
        dateOccurred.getTime() < dateFor.now &&
        dateOccurred.getTime() > subYears(dateFor.now, 1).getTime()
      ) {
        return acum + violation.severity.grade
      } else {
        return acum
      }
    }, 0)

    if (sumGrades >= 12) {
      return {
        possibility: false,
        message:
          "Não é possível viajar tendo 12 pontos de infração acumulados nos últimos 12 meses."
      }
    }

    const dateRange: Interval = {
      start: subYears(dateFor.now, 1),
      end: addYears(dateFor.now, 1)
    }

    const violationsOccurredInRange =
      await this.violationRepository.findByDateRange(
        dateRange.start,
        dateRange.end
      )

    if (violationsOccurredInRange) {
      return {
        possibility: false,
        message:
          "Há violação registrada no período de 1 ano antes e após a data desejada para a viagem."
      }
    }

    return {
      possibility: true,
      message: "É possível viajar para a data requerida."
    }
  }
}
