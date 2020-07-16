const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/tokenMiddleware");
const configureMiddleware = require("../middleware/globalMiddleware");
const errorHandler = require("../middleware/errorMiddleware");
const Note = require("../models/note");
const User = require("../models/user");
const faker = require("faker");


const server = express();

configureMiddleware(server);

server.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Note {
            _id: ID!
            title: String!
            textBody: String!
            updatedAt: String!
        }

        input NoteInput {
            title: String!
            textBody: String!
            updatedAt: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            token: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            notes: [Note!]!
        }

        type RootMutation {
            addNote(content: NoteInput): Note
            register(credentials: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      notes: () => {
        /* SEED FUNCTION */
        /* for (let i = 0; i < 20; i++) {
             const seedNote = new Note({
                 title: faker.random.word(),
                 textBody: faker.hacker.phrase(),
                 updatedAt: faker.date.recent(30),
                 createdBy: "5f10ceaef64f4a5500f29b43"
             })
             let createdSeed;
             seedNote.save().then(res => {
                 createdSeed = res._doc
                 return User.findById('5f10ceaef64f4a5500f29b43')
             }).then(user => {
                 if (!user) {
                     throw new Error("User not found.");
                   } 
                   user.createdNotes.push(seedNote)
                   return user.save()
               })
               .then(res => {
                   return createdSeed
               })
             .catch(err => {throw err})
            }
        */
        
        return Note.find()
          .then((notes) => {
            return notes.map((note) => {
              return { ...note._doc };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      addNote: (note) => {
        const newNote = new Note({
          title: note.content.title,
          textBody: note.content.textBody,
          updatedAt: new Date(note.content.updatedAt),
          createdBy: "5f10ceaef64f4a5500f29b43"
        });
        let createdNote;
        return newNote
          .save()
          .then((res) => {
            createdNote= res._doc
            return User.findById('5f10ceaef64f4a5500f29b43')
          })
          .then(user => {
            if (!user) {
                throw new Error("User not found.");
              } 
              user.createdNotes.push(newNote)
              return user.save()
          })
          .then(res => {
              return createdNote
          })
          .catch((err) => {
            throw err;
          });
      },
      register: (user) => {
        return User.findOne({ email: user.credentials.email })
          .then((res) => {
            if (res) {
              throw new Error("User already exists.");
            } 
            return bcrypt.hash(user.credentials.password, 14);
          })
          .then((hashed) => {
            const newUser = new User({
              email: user.credentials.email,
              password: hashed,
            });

            return newUser.save();
          })
          .then((res) => {
            const token = generateToken({ ...res._doc });
            return { ...res._doc, password: null, token};
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

server.use(errorHandler);

module.exports = server;
