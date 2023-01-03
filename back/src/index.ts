import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { GraphQLFormattedError } from "graphql";
import http from 'node:http';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { LoginResolver, TimeTravellerResolver, ViolationsResolver } from "./api";
import { dbConfig } from "./data/db/dbconfig";
require("dotenv").config()

const app = express()
const httpServer/* <AuthChecker> */ = http.createServer(app);

interface ServerContext {
  token?: string
  authScope?: string;
}

;(async function () {
  const schema = await buildSchema({
    // validate: false,
    // dateScalarMode: "isoDate",
    
    resolvers: [ TimeTravellerResolver, ViolationsResolver, LoginResolver ],

    //plugins<[T<BuildSchemaOptions>]>: [ApolloServerPluginDrainHttpServer({ httpServer })],

    authChecker: ({ context }: { context: ServerContext }) => {
      console.log(context.token) // verifica se tem o token;
      return true
    },

    // authMode: (undefined),
  
    //directives: [Authorized(Token), TokenKind]
  })

  const apolloServer = new ApolloServer<ServerContext>({
    schema,
    
    formatError: (error: GraphQLFormattedError) => {
      console.error(">  Some error occurred in processing request/GraphQL  <")
      console.log(error);
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
        extensions: error.extensions
        
      }
    }
  })

  await apolloServer.start()

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { token: req.headers.authorization }
      }
    })
  )

  await dbConfig()
  
})()

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `http://${process.env.HOST}:%d/graphql`,
    process.env.PORT || 3000
  )
})