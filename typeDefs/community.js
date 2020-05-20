const { gql } = require("apollo-server-express");
module.exports.community = gql`
  extend type Query {
    findCommunity(id: ID!): Community
  }
  extend type Mutation {
    createCommunity(userInput: createCommunity): Community
  }
  type Community {
    id: ID
    name: String
    address: String!
    tenants: [User]
    events: [Event]
    givings: [Giving]
    posts: [Post]
    Date: Date
  }
  input createCommunity {
    name: String
    address: String!
  }
`;
