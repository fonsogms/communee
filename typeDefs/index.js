const { user } = require("./user");
const { community } = require("./community");
const { gql } = require("apollo-server-express");
const index = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [index, user, community];
