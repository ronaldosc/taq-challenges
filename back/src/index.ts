import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { dbConfig } from "@data/db/dbconfig"
import { ServerContext } from "@domain/model"
import { EnvConfig, HOST, PATHTO, PORT } from "@env"
import { JwtService } from "@jwt"
import express from "express"
import { GraphQLFormattedError } from "graphql"
import { buildSchema } from "type-graphql"
import Container from "typedi"
import { resolvers } from "./api"

const app = express()

EnvConfig.config()
const port: number = Container.get(PORT) | 0
const pathTo = Container.get(PATHTO)
const host = Container.get(HOST)
const jwtService = Container.get(JwtService)

;(async function () {
  const schema = await buildSchema({
    resolvers,
    container: Container,
    authChecker: ({ context }: { context: ServerContext }) => {
      try {
        if (!context.token) {
          throw new Error()
        }

        const { birth, id, name, passport } = jwtService.verifyToken(
          context.token
        )!
        if (!birth && !id && !name && !passport) {
          throw new Error()
        }

        return true
      } catch {
        throw new Error("Usuário sem credenciais válidas!")
      }
    }
  })

  const apolloServer = new ApolloServer<ServerContext>({
    schema,
    formatError: (error: GraphQLFormattedError) => {
      const { message, locations, path, extensions } = error
      const tracesValues = Object.values(extensions!).toString()
      if (tracesValues.includes("GraphQLError")) {
        return (
          console.error(
            "\x1b[33;1m",
            ">  Some error occurred in GraphQL and/or processing request  <",
            "\x1b[0m"
          ),
          { message, locations, path, extensions }
        )
      }
      return { message }
    }
  })

  await apolloServer.start()
  await dbConfig()

  app.use(
    pathTo,
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { token: req.headers.authorization! }
      }
    })
  )
})()

app.listen(port, () => {
  console.log("\x1b[3;1m", `http://${host}:${port}${pathTo}`, "\x1b[0m")
})
