import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import express from "express"
import "reflect-metadata"
// import { GraphQLError } from "graphql"
import { GraphQLFormattedError } from "graphql"
import { buildSchema } from "type-graphql"
import { LoginResolver, TimeTravellerResolver, ViolationsResolver } from "./api"
import { dbConfig } from "./data/db/dbconfig"
require("dotenv").config()

const app = express()

interface ServerContext {
  token?: string
}

;(async function () {
  const schema = await buildSchema({
    resolvers: [TimeTravellerResolver, ViolationsResolver, LoginResolver]
  })

  const apolloServer = new ApolloServer<ServerContext>({
    formatError: (error: GraphQLFormattedError) => {
      return {
        name: error,
        message: error.message,
        locations: error.locations
      }
      console.error(">  Some error occurred in GraphQL  <")
    },
    schema
  })

  await apolloServer.start()
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  )
  await dbConfig()

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `http://${process.env.HOST}:%d/graphql`,
      process.env.PORT || 3000
    )
  })
})()
