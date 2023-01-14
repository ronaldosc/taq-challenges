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
const port:number = Container.get(PORT)
const pathTo = Container.get(PATHTO)
const host = Container.get(HOST)
const jwtService = Container.get(JwtService)

;(async function () {
  const schema = await buildSchema({
    resolvers,   /* [TimeTravellerResolver, ViolationsResolver, LoginResolver] */
    authChecker: ({ context }: { context: ServerContext }) => {
      if (!context.token) {
        throw new Error("Usuário sem credenciais válidas!")
      }
      try {
        const { birth, id, name, passport } = jwtService.verifyToken(
          context.token
        )!
        if (!birth && !id && !name && !passport) throw new Error();
        return true
      } catch {
        throw new Error("Usuário sem credenciais válidas!")
      }
    },
    container: Container
  })

  const apolloServer = new ApolloServer<ServerContext>({
    schema,
    formatError: (error: GraphQLFormattedError) => {
      const { message, locations, path, extensions } = error
      const tracesValues = Object.values(extensions!).toString()
      if (tracesValues.includes("GraphQLError")) {
        return (
          console.error(
            ">  Some error occurred in GraphQL and/or processing request  < \n"
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
  console.log(`http://${host}:%d${pathTo}`, port)
})
