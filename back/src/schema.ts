import { gql } from 'apollo-server'
export const typeDefs = gql
    `
    type Query {
        hello: String!
        }
    
    #type Mutation {
        
    #}
    `

/*
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    buildSchema
} = require('graphql')
*/