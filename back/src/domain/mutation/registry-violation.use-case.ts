import {
  SeverityDataSource,
  TimeTravellerDataSource,
  ViolationDataSource
} from "@data/source"
import { RegistryViolationInputModel, ViolationModel } from "@domain/model"

export class RegistryViolationUseCase {
  private readonly timeTravellerRepository = new TimeTravellerDataSource()
  private readonly violationRepository = new ViolationDataSource()
  private readonly severityRepository = new SeverityDataSource()

  async exec(input: RegistryViolationInputModel): Promise<ViolationModel> {
    const { description, occurredAt, passport, severity } = input
    const timeTraveller = await this.timeTravellerRepository.findOneByPassport(
      passport
    )

    if (!timeTraveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} não existe.`)
    }

    if (!new Date(occurredAt)?.getTime()) {
      throw new Error(
        `A data informada para a ocorrência ${occurredAt} não é válida.`
      )
    }

    const severityGrade = await this.severityRepository.findOneByGrade(severity)

    if (!severityGrade) {
      throw new Error(`Infração com gravidade nível ${severity} inexistente.`)
    }
    //TODO  AJUSTAR AQUI POIS O SEVERITY ESTÁ TIPADO e conflito de nomes aqui ?
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
