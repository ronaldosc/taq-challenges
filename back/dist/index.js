"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const resolver_1 = require("./resolver");
const schema_1 = require("./schema");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// const { errorType } = require('../constants')
// const getErrorCode = errorName => {
//     return errorType[errorName]
// }
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    formatError: err => {
        return {
            name: err.name,
            message: err.message
        };
    },
    resolvers: resolver_1.resolvers
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app, path: "/graphql" });
        app.listen(process_1.env.PORT || 3000, () => {
            console.log('http://localhost:%d/graphql', process_1.env.PORT || 3000);
        });
    });
})();
// app.use('/graphql', (req, res) => {
//     expressGraphQL()
// }
// )
// format error logger
// usar apollo
// app.get('/', (req, res) => {
//     res.send("Hey, tente no caminho /graphql \n  =]")
// })
// app.listen(process.env.PORT || 8080, () => {
//     console.log('App running on ');
// })
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
