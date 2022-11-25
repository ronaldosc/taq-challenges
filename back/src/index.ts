import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { env } from 'process';
import { dbConfig } from './db/dbconfig';
import { resolvers } from './resolver';
import { typeDefs } from './schema';
require("dotenv").config();

const app = express()

const apolloServer = new ApolloServer({
    typeDefs,
    formatError: err => {
            return {
                name: err.name,
                message: err.message
            };
    },
    resolvers
})

;(async function() {
    await apolloServer.start()
    apolloServer.applyMiddleware({app, path: "/graphql"})
    await dbConfig()

    // antes do listen o dbconfig
    app.listen(env.PORT || 3000, () => {
        console.log('http://localhost:%d/graphql', env.PORT || 3000);
        
    })
})()
