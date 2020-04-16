const { gql } = require("apollo-server-express");
module.exports.user = gql`
  extend type Query {
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;
