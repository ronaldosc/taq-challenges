import { SeverityDataSource, TimeTravellerDataSource, ViolationDataSource } from "../../data/source";
import { RegistryViolationInputModel, ViolationModel } from "../model";

export const registryViolationUseCase = async (
  input: RegistryViolationInputModel
  ): Promise<ViolationModel> => {
  const timeTravellerRepository = new TimeTravellerDataSource();
  const violationRepository = new ViolationDataSource();
  const severityRepository = new SeverityDataSource();

  const timeTraveller = await timeTravellerRepository.findOneByPassport(input.passport);

  if (!timeTraveller) {
    throw new Error(`Usuário com o passaporte nº ${input.passport} não existe.`)
  }

  const severity = await severityRepository.findOneByGrade(input.severity);

  if (!severity) {
    throw new Error(
      `Infração com gravidade nível ${input.severity} inexistente.`
    )
  }

  const violation = await violationRepository.save({
    description: input.description,
    occurred_at: new Date(input.occurredAt),
    time_traveller: timeTraveller,
    severity
  })

  return {
    description: violation.description,
    id: violation.id,
    severity: severity.grade
  }
}
