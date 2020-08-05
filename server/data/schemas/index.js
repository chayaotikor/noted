const { buildSchema } = require("graphql");

module.exports = buildSchema(`
 type Note {
     _id: ID!
     title: String!
     textBody: String!
     createdBy: User!
     updatedAt: String!
 }

 input CreateInput {
     title: String!
     textBody: String!
 }

 input UpdateInput {
    title: String
    textBody: String
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
     getAllNotes(userId: ID!): [Note!]!
     getNote(noteId: ID!): Note!
     login(email: String!, password: String!): AuthData!
 }

 type RootMutation {
     register(credentials: UserInput): User
     addNote(content: CreateInput, userId: ID!): Note
     editNote(content: UpdateInput, noteId: ID!): Note
     deleteNote(noteId: ID!, userId: ID!): User
     changePassword(email: String!, oldPassword: String!, newPassword: String!): User
 }

 schema {
     query: RootQuery
     mutation: RootMutation
 }
`)

