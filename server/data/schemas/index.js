const { buildSchema } = require("graphql");

module.exports = buildSchema(`
 type Note {
     _id: ID!
     title: String!
     textBody: String!
     createdBy: User!
     updatedAt: String!
 }

 input NoteInput {
     title: String!
     textBody: String!
 }

 type User {
     _id: ID!
     email: String!
     token: String!
     tokenExpiration: Int!
     createdNotes: [Note!]
 }

 input UserInput {
     email: String!
     password: String!
 }

 type AuthData {
     _id: ID!
     email: String!
     token: String!
     tokenExpiration: Int!
 }

 type RootQuery {
     getAllNotes: [Note!]!
     getNote(noteId: ID!): Note!
     login(email: String!, password: String!): AuthData!
 }

 type RootMutation {
     addNote(content: NoteInput, userId: ID!): Note
     register(credentials: UserInput): User
 }

 schema {
     query: RootQuery
     mutation: RootMutation
 }
`)

