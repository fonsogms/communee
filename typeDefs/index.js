const { user } = require("./user");
const { community } = require("./community");
const { giving } = require("./giving");
const { event } = require("./event");
const { post } = require("./post");
const { apis } = require("./extApis");
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

module.exports = [index, user, post, community, event, giving, apis];
