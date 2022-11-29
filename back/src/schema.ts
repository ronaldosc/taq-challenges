import { gql } from 'apollo-server'
// id no input nao eh necesario por conta de que será criado na req
// createTimeTraveler(input [qualquer]: REQ): RES
// no type ele é usado para a res e identificar o identificador do usuário cadastrado
//e as exclamações no type é para indicar ao cliente/front que esses dados são garatidos na resposta

export const typeDefs = gql
    `
    input TravellerInput {
        name: String!
        birth: String!
        passport: Int!
    }

    type TimeTraveller {
        id: String!
        name: String!
        birth: String!
        passport: Int!
    }

   #type Violation {
   #    
   #}

   #type Infraction {
   #   
   #}

   #type Travel {
   #    canTravel

   #}

    type Query {
        hello: String!
        }
    
    type Mutation {
        createTimeTraveler(input: TravellerInput): TimeTraveller

       # updateMessage(id: ID!, input: MessageInput): Message
    }
    `
