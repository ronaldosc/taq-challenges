import { ApolloServer } from "@apollo/server"
import express from "express"
// import { GraphQLError } from "graphql"
import { buildSchema } from "type-graphql"
import { dbConfig } from "./data/db/dbconfig"
require("dotenv").config()

const app = express()

;(async function () {
  const schema = await buildSchema({
     resolvers:  [ ()  => { }  ],
    emitSchemaFile: {   path: '.\\api\\time-traveller.resolver.ts'      }    
  })

  const apolloServer = new ApolloServer({
    // typeDefs,
    formatError: ( _: any , error: any) => {
      return {
        name: error.name,
        message: error.message
      }
    },
    schema     
  })

  await apolloServer.start()
  apolloServer.executeHTTPGraphQLRequest
  await dbConfig()

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `http://${process.env.HOST}:%d/graphql`,
      process.env.PORT || 3000
    )
  })
})()
