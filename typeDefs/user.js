const { gql } = require("apollo-server-express");
module.exports.user = gql`
  extend type Query {
    user(name: String, email: String, id: ID): User!
  }

  extend type Mutation {
    createUser(userInput: createUser): User
    updateUser(userInput: updateUser): User
    login(email: String, password: String): Token
    logout: String
  }
  input createUser {
    name: String!
    email: String!
    password: String!
    profilePic: String
    community: String!
  }
  input updateUser {
    id: ID!
    name: String
    email: String
    password: String
    profilePic: String
    community: ID
  }
  type Token {
    token: String!
  }
  type User {
    id: ID!
    name: String!

    email: String!
    password: String!
    profilePic: String
    community: ID
    Date: Date
  }
`;
