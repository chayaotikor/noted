const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const configureMiddleware = require("../middleware/globalMiddleware");
// const errorHandler = require("../middleware/errorMiddleware");
const {protected} = require("../middleware/tokenMiddleware")
const schema = require('../data/schemas/index')
const {rootResolver} = require('../data/resolvers')

const server = express();

configureMiddleware(server);
server.use(protected)
// server.use(errorHandler);

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

module.exports = server;
