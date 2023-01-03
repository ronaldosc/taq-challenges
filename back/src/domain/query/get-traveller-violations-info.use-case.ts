import { isNotEmptyObject } from "class-validator"
import { TimeTravellerDataSource, ViolationDataSource } from "../../data/source"
import {
  GetTravellerViolationsInputModel
} from "../model"

export const getTravellerViolationsInfoUseCase = async (
  data: GetTravellerViolationsInputModel
) /* : Promise<TravellerViolationsModel[] | object>  */ => {
  //////////////////////////////////
  const timeTravellerRepository = new TimeTravellerDataSource()
  const violationRepository = new ViolationDataSource()

  const timeTraveller = await timeTravellerRepository.findOneByPassport(
    data.passport
  )
  //TODO  ACERTAR O ERRO AQUI
  if (!timeTraveller) {
    throw new Error(`Usuário com o passaporte nº ${data.passport} não existe.`)
  }

  const violations = await violationRepository.findByTravellerId(
    timeTraveller.id
  ).then(violations => {
    if (!isNotEmptyObject(violations.reduce)) {
      return {message: `Usuário com o passaporte nº ${data.passport} não possui infrações registradas.`}
    } else {
      return violations.map(
        violation => (
          data.passport,
          {
            ...violation,
            severity: violation.severity.grade
          }
        )
      )
    }
  });  

  console.dir(violations) /////////////////
/* 
  if (violations.includes({})) {
    return {
      message: `Usuário com o passaporte nº ${data.passport} não possui infrações registradas.`
    }
  } */
 
  
}

