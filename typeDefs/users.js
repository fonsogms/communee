const { gql } = require("apollo-server-express");
module.exports.user = gql`
  extend type Query {
    user(name: String!, email: String!): User!
  }
  extend type Mutation {
    user(name: String!, email: String!): User!
  }

  type User {
    name: String!
    email: String!
  }
`;
