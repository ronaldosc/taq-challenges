import { createTimeTravellerUseCase } from "./mutation/create-time-traveller.use-case"
import { loginUseCase } from "./mutation/login.use-case"
import { registryViolationUseCase } from "./mutation/registry-violation.use-case"
import { verifyTravelPossibilityUseCase } from "./mutation/verify-travel-possibility.use-case"
import { getTravellerInfoUseCase } from "./query/get-traveller-info.use-case"
import { getTravellerViolationsInfoUseCase } from "./query/get-traveller-violations-info.use-case"
    
export const resolvers = {
  Query: {
    getTravellerInfo: getTravellerInfoUseCase,
    getTravellerViolationsInfo: getTravellerViolationsInfoUseCase
  },
  Mutation: {
    createTimeTraveller: createTimeTravellerUseCase,
    registryViolation: registryViolationUseCase,
    verifyTravelPossibility: verifyTravelPossibilityUseCase,
    login: loginUseCase
  }
}
