const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const configureMiddleware = require("../middleware/globalMiddleware");
const errorHandler = require("../middleware/errorMiddleware");
const schema = require('../data/schemas/index')
const resolvers = require('../data/resolvers/index')

const server = express();

configureMiddleware(server);

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

server.use(errorHandler);

module.exports = server;
