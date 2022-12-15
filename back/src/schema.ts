import { gql } from 'apollo-server'


export const typeDefs = gql`
    input TravellerInput {
        name: String!
        birth: String!
        passport: Int!
    }
    
    input ViolationInput {
        passport: Int!
        description: String!
        # occurred_at: new Date!
        timeTraveller: TravellerInput
        severity: SeverityInput #InfractionSeverity
    }

    input getTravellerInput {
        id: ID!
    }

    input SeverityInput {
        serverity: Int!
    }

    type Severity {
        serverity: Int!
    }

    type TimeTraveller {
        id: String!
        name: String!
        birth: String!
        passport: Int!
    }
    type Violation {
        id: String!
        passport: Int!
        description: String!
    }

    type Query {
        # id: ID
        getTravellerInfo(data: getTravellerInput): TimeTraveller
        }
    
    type Mutation {
        createTimeTraveller(input: TravellerInput): TimeTraveller
       
    }

    `


// #type Violation { }
// #type Infraction { }
// #type Travel {  canTravel  }