import { ApolloServer } from "apollo-server-express"
import express from "express"
import { GraphQLError } from "graphql"
import { env } from "process"
import { dbConfig } from "./db/dbconfig"
import { resolvers } from "./resolvers"
import { typeDefs } from "./schema"
require("dotenv").config()

const app = express()

const apolloServer = new ApolloServer({
  typeDefs,
  formatError: (error: GraphQLError) => {
    return {
      name: error.name,
      message: error.message
    }
  },
  resolvers
})

;(async function () {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: "/graphql" })
  await dbConfig()

  app.listen(env.PORT || 3000, () => {
    console.log(`http://${env.HOST}:%d/graphql`, env.PORT || 3000)
  })
})()
