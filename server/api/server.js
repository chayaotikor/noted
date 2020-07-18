const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const configureMiddleware = require("../middleware/globalMiddleware");
const errorHandler = require("../middleware/errorMiddleware");
const schema = require('../data/schemas/index')
const {rootResolver} = require('../data/resolvers')

const server = express();

configureMiddleware(server);

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

server.use(errorHandler);

module.exports = server;
