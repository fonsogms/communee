const { user } = require("./users");
const { gql } = require("apollo-server-express");
const index = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [index, user];
