import {
  SeverityDataSource,
  TimeTravellerDataSource,
  ViolationDataSource
} from "@data/source"
import { RegistryViolationInputModel, ViolationModel } from "@domain/model"
import { Service } from "typedi"

@Service()
export class RegistryViolationUseCase {
  constructor(
    private readonly timeTravellerRepository: TimeTravellerDataSource,
    private readonly violationRepository: ViolationDataSource,
    private readonly severityRepository: SeverityDataSource
  ) {}

  async exec(
    input: RegistryViolationInputModel
  ): Promise<ViolationModel> {
    const { description, occurredAt, passport, severity } = input
    const timeTraveller = await this.timeTravellerRepository.findOneByPassport(
      passport
    )

    if (!timeTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não existe.`)
    }

    const dateInputNumbered = new Date(occurredAt)?.getTime()

    if (!dateInputNumbered) {
      throw new Error(
        `A data informada '${occurredAt}' não é válida para registrar a ocorrência.`
      )
    }

    const severityGrade = await this.severityRepository.findOneByGrade(severity)

    if (!severityGrade) {
      throw new Error(`Infração com gravidade nível ${severity} inexistente.`)
    }

    const previousViolations = await this.violationRepository.findByTravellerId(
      timeTraveller.id
    )

    previousViolations.map(registeredViolations => {
      if (
        registeredViolations.severity.grade === severity &&
        registeredViolations.occurred_at.getTime() === dateInputNumbered &&
        registeredViolations.description === description
      ) {
        throw new Error(`Não é possível registrar infração duplicada.`)
      }
    })

    const violation = await this.violationRepository.save({
      description,
      occurred_at: new Date(occurredAt),
      time_traveller: timeTraveller,
      severity: severityGrade
    })

    return {
      description,
      id: violation.id,
      occurredAt: violation.occurred_at,
      passport: timeTraveller.passport,
      severity: severityGrade.grade
    }
  }
}
