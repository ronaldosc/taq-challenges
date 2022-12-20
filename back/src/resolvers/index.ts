import createTimeTraveller from "./mutation/createTimeTraveller"
import registryViolation from "./mutation/registryViolation"
import verifyTravelPossibility from "./mutation/verifyTravelPossibility"
import getTravellerInfo from "./query/getTravellerInfo"
import getTravellerViolationsInfo from "./query/getTravellerViolationsInfo"
    
export const resolvers = {
  Query: {
    getTravellerInfo,
    getTravellerViolationsInfo
  },
  Mutation: {
    createTimeTraveller,
    registryViolation,
    verifyTravelPossibility
  }
}
