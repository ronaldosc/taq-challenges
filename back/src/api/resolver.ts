import {
  createTimeTravellerUseCase,
  getTravellerInfoUseCase,
  getTravellerViolationsInfoUseCase,
  loginUseCase,
  registryViolationUseCase,
  verifyTravelPossibilityUseCase
} from "../domain"

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
