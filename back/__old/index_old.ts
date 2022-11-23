import express from 'express';
import { graphqlHTTP as expressGraphQL } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express()
const firstMsg = {
    hello: () => { return 'Hey, mundaum!' }
}

const { errorType } = require('./constants')
const getErrorCode = errorName => {
    return errorType[errorName]
}

app.use('/graphql', (req, res) => {
    expressGraphQL({
        schema: buildSchema(require('./gql.schema')),
        rootValue: firstMsg,
        graphiql: process.env.NODE_ENV === 'development',
        context: { req },
        customFormatErrorFn: err => {
            try {
                err.details = JSON.parse(err.message);
                err.message = Array.isArray(err.details.error) ? err.details.error.join(",") : err.details.error;
                return err;
            } catch {
                return err;
            }
        }
    })
}
)

// format error logger


// usar apollo
app.get('/', (req, res) => {
    res.send("Hey, tente no caminho /graphql \n  =]")
})

app.listen(process.env.PORT || 8080, () => {
    console.log('App running on ');

})


/*
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    buildSchema
} = require('graphql')
*/