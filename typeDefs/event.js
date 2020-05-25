const { gql } = require("apollo-server-express");
module.exports.event = gql`
  extend type Mutation {
    createEvent(userInput: eventInput): Event
  }
  input eventInput {
    date: String
    title: String!
    description: String!
    where: String!
    organizer: String!
    community: ID!
  }
  type Event {
    id: ID!
    date: Date!
    title: String!
    description: String!
    where: String!
    organizer: User!
    participants: [User]
  }
`;
