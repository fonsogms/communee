const { gql } = require("apollo-server-express");
module.exports.event = gql`
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
