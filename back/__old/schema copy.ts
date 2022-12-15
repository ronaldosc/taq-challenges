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
        time_traveller: TimeTraveller
        severity: Severity #InfractionSeverity
    }
    input getTravellerInput {
        id: ID!
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
        # occurred_at(date: new Date): String!
        # time_traveller(user: getTraveller): String!
    }

    type Query {
        id: ID
        getTravellerInfo(data: getTravellerInput): TimeTraveller
        }
    
    type Mutation {
        createTimeTraveller(input: TravellerInput): TimeTraveller
        # insertViolation(input: ViolationInput): Violation

       # updateMessage(id: ID!, input: MessageInput): Message
    }

    # enum ViolationSeverity {
    # LOW = 3,
    # MEDIUM = 5,
    # HIGH = 7,
    # HIGHEST = 12
    # }

    `


// #type Violation { }
// #type Infraction { }
// #type Travel {  canTravel  }