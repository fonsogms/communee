const { gql } = require("apollo-server-express");
module.exports.event = gql`
  extend type Query {
    getEvent(id: ID): Event
  }
  extend type Mutation {
    createEvent(userInput: eventInput): Event
    deleteEvent(id: ID!, communityId: ID!): Event
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
    organizer: ID!
    participants: [User]
  }
`;
