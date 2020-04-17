const { gql } = require("apollo-server-express");
module.exports.user = gql`
  extend type Query {
    user: User!
  }

  type User {
    name: String!
    email: String!
  }
`;
