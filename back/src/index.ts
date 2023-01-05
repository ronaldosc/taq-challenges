import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import express from "express"
import { GraphQLFormattedError } from "graphql"
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
        const decodedToken = verifyToken(context.token)

        if (
          !!decodedToken?.birth &&
          !!decodedToken.id &&
          !!decodedToken.name &&
          !!decodedToken.passport
        ) {
          return true
        }

        throw new Error()
      } catch {
        throw new Error("Usuário sem credenciais válidas!")
      }
    }
  })

  const apolloServer = new ApolloServer<ServerContext>({
    schema,

    formatError: (error: GraphQLFormattedError) => {
      const { message, locations, path, extensions } = error
      let tracesKey = Object.values(extensions!).toString()
      if (tracesKey.includes("GraphQLError")) {
        console.error(
          ">  Some error occurred in processing request and/or GraphQL  <"
        )
        return { message, locations, path, extensions }
      }
      return { message }
      // se for o erro for emitido por GraphQLError ele exibirá informação completa
    }
  })

  await apolloServer.start()

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { token: req.headers.authorization! }
      }
    })
  )

  await dbConfig()
})()

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://${process.env.HOST}:%d/graphql`, process.env.PORT || 3000)
})
