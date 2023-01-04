import { TimeTravellerDataSource, ViolationDataSource } from "../../data/source"
import {
  GetTravellerViolationsInputModel,
  TravellerViolationModel
} from "../model"

export const getTravellerViolationsInfoUseCase = async (
  data: GetTravellerViolationsInputModel
): Promise<TravellerViolationModel[]> => {
  const timeTravellerRepository = new TimeTravellerDataSource()
  const violationRepository = new ViolationDataSource()

  const timeTraveller = await timeTravellerRepository.findOneByPassport(
    data.passport
  )
  if (!timeTraveller) {
    throw new Error(`Usuário com o passaporte nº ${data.passport} não existe.`)
  }

  const violations = await violationRepository.findByTravellerId(
    timeTraveller.id
  )

  //  if (violations.every(violation => violation.time_traveller !== null)) {
  //     return {message: `Usuário com o passaporte nº ${data.passport} não possui infrações registradas.`}
  //   }
    // for (const [_key, value] of Object.entries(violations.values)) {
      if (!violations.length){
        throw new Error(`Usuário com o passaporte nº ${data.passport} não possui infrações registradas.`)}
      
    // console.dir(violations) /////////////////
    
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
    

/* 
  if (violations.includes({})) {
    return {
      message: `Usuário com o passaporte nº ${data.passport} não possui infrações registradas.`
    }
  } */
 
  

