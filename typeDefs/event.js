const { gql } = require("apollo-server-express");
module.exports.event = gql`
  extend type Query {
  }
  extend type Mutation {
  }
  type Event {
    date: Date!
    title: String!
    description: String!
    where: String!
    organizer: User!
    participants:[User]
  }
  input EventInput {
    date: Date!
    title: String!
    description: String!
    where: String!
    organizer: User!
  }
`;
