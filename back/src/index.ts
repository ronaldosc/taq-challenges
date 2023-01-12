import "reflect-metadata";
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ServerContext } from "@domain/model"
import { verifyToken } from "@security"
import express from "express"
import { GraphQLFormattedError } from "graphql";
import { dbConfig } from "@data/db/dbconfig"
import { buildSchema } from "type-graphql"
import { LoginResolver, TimeTravellerResolver, ViolationsResolver } from "./api"
import { EnvConfig, PORT, PATHTO } from '@core/env/env.config';

const app = express()

;(async function () {
  EnvConfig.config();
  const port = Container.get(PORT);
  const pathto = Container.get(PATHTO);
  const host = Container.get(HOST);

  const schema = await buildSchema({
    resolvers: [TimeTravellerResolver, ViolationsResolver, LoginResolver],
    authChecker: ({ context }: { context: ServerContext }) => {
      if (!context.token) {
        throw new Error("Usuário sem credenciais válidas!")
      }
      try {
        const { birth, id, name, passport } = verifyToken(context.token)!
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
      const tracesKey = Object.values(extensions!).toString()
      if (tracesKey.includes("GraphQLError")) {
        console.error(
          ">  Some error occurred in GraphQL and/or processing request  < \n"
        )
        return { message, locations, path, extensions }
      }
      return { message }
    }
  })

  await apolloServer.start()
  await dbConfig()

  app.use(
    pathto,
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { token: req.headers.authorization! }
      }
    })
  )
})()

app.listen(port, () => {
  console.log(`http://${host}:%d${pathto}`, port)
})
