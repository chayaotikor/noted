const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const configureMiddleware = require("../middleware/globalMiddleware");
const errorHandler = require("../middleware/errorMiddleware");
const faker = require("faker");

const server = express();

configureMiddleware(server);

const testNotes = [];
const currentID = 0

server.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Note {
            _id: ID!
            title: String!
            textBody: String!
        }

        input NoteInput {
            title: String!
            textBody: String!
        }

        type RootQuery {
            notes: [Note!]!
        }

        type RootMutation {
            addNote(note: NoteInput): Note
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      notes: () => {
        const create = () => ({
            _id: currentID,
            title: faker.random.word(),
            textBody: faker.hacker.phrase()
        });

       
        for (let i = 0; i < 20; i++) {
          testNotes.push(create());
          currentID++
        }
        return testNotes
      },
      addNote: (note) => {
        const newNote = {
            _id: currentID,
            title: faker.random.word(),
            textBody: faker.hacker.phrase()
        }  
        currentID++
        return newNote
      },
    },
    graphiql: true,
  })
);

server.use(errorHandler);

module.exports = server;
