const { buildSchema } = require("graphql");

module.exports = buildSchema(`
 type Note {
     _id: ID!
     title: String!
     textBody: String!
     createdBy: User!
 }

 input NoteInput {
     title: String!
     textBody: String!
 }

 type User {
     _id: ID!
     email: String!
     password: String
     token: String!
     createdNotes: [Note!]
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
`)

