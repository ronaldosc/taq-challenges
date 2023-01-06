import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import express from "express"
import { GraphQLFormattedError } from "graphql"
import { env } from "node:process"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { LoginResolver, TimeTravellerResolver, ViolationsResolver } from "./api"
import { verifyToken } from "./core/security"
import { dbConfig } from "./data/db/dbconfig"
import { ServerContext } from "./domain/model"
require("dotenv").config()

const app = express()

;(async function () {
  const schema = await buildSchema({
    resolvers: [TimeTravellerResolver, ViolationsResolver, LoginResolver],
    authChecker: ({ context }: { context: ServerContext }) => {
      if (!context.token) {
        throw new Error("Usuário sem credenciais válidas!")
      }

      try {
        const { birth, id, name, passport } = verifyToken(context.token)!
        if (!!birth && !!id && !!name && !!passport) {
          return true
        }
        throw new Error("ID")
      } catch {
        throw new Error("Usuário sem credenciais válidas!")
      }
    }
  })

  const apolloServer = new ApolloServer<ServerContext>({
    schema,

    formatError: (error: GraphQLFormattedError) => {
      const { message, locations, path, extensions } = error
      const tracesKey = Object.values(extensions!).toString()
      if (tracesKey.includes("GraphQLError")) {
        console.error(
          " >  Some error occurred in processing request and/or GraphQL  < \n"
        )
        return { message, locations, path, extensions }
      }
      return { message }
      // se for o erro for emitido por GraphQLError ele exibirá informação completa
    }
  })

  await apolloServer.start()

  app.use(
    env.PATHTO!,
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { token: req.headers.authorization! }
      }
    })
  )

  await dbConfig()
})()

app.listen(env.PORT || 3000, () => {
  console.log(`http://${env.HOST}:%d${env.PATHTO}`, env.PORT || 3000)
})
