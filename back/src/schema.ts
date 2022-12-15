import { gql } from 'apollo-server';

export const typeDefs = gql`
    input TravellerInput {
        name: String!
        birth: String!
        passport: Int!
    }
    
    input ViolationInput {
        passport: Int!
        description: String!
        occurredAt: String!
        severity: Int!
    }

    input getTravellerInput {
        passport: Int!
    }

    input SeverityInput {
        severity: Int!
    }

    type Severity {
        severity: Int!
    }

    type TimeTraveller {
        id: String!
        name: String!
        birth: String!
        passport: Int!
    }
    type Violation {
        id: String!
        timeTraveller: TimeTraveller!
        description: String!
        severity: Int!
    }

    type Query {
        # id: ID
        getTravellerInfo(data: getTravellerInput!): TimeTraveller!
        }
    
    type Mutation {
        createTimeTraveller(input: TravellerInput!): TimeTraveller!
        registryViolation(input: ViolationInput!): Violation!
    }
`;

// #type Violation { }
// #type Infraction { }
// #type Travel {  canTravel  }