import { gql } from "apollo-server"

export const typeDefs = gql`
  input TravellerInput {
    name: String!
    birth: String!
    passport: Int!
  }
  input GetTravellerInput {
    passport: Int!
  }
  input ViolationInput {
    passport: Int!
    description: String!
    occurredAt: String!
    severity: Int!
  }
  input GetViolationInput {
    passport: Int!
  }
  input VerifyTimeTravelPossibilityInput {
    passport: Int!
    travelDate: String!
  }

  type TimeTraveller {
    id: String
    name: String!
    birth: String!
    passport: Int!
  }
  type Violation {
    id: String!
    passport: Int
    description: String!
    severity: Int!
  }
  type TravelPossibilityResponse {
    message: String!
    possibility: Boolean!
  }
  # Query and Mutations below
  type Query {
    getTravellerInfo(data: GetTravellerInput!): TimeTraveller!
    getTravellerViolationsInfo(data: GetViolationInput!): [Violation]!
  }
  type Mutation {
    createTimeTraveller(input: TravellerInput!): TimeTraveller!
    registryViolation(input: ViolationInput!): Violation!
    verifyTravelPossibility(
      input: VerifyTimeTravelPossibilityInput!
    ): TravelPossibilityResponse!
  }
`
