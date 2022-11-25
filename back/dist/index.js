"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const dbconfig_1 = require("./db/dbconfig");
const resolver_1 = require("./resolver");
const schema_1 = require("./schema");
require("dotenv").config();
const app = (0, express_1.default)();
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
(async function () {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/graphql" });
    await (0, dbconfig_1.dbConfig)();
    // antes do listen o dbconfig
    app.listen(process_1.env.PORT || 3000, () => {
        console.log('http://localhost:%d/graphql', process_1.env.PORT || 3000);
    });
})();
