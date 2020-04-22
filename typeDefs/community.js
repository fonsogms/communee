const { gql } = require("apollo-server-express");
module.exports.community = gql`
  extend type Query {
    community(id: ID): Community!
  }
  extend type Mutation {
    createCommunity(userInput: createCommunity): Community
  }
  type Community {
    name: String
    address: String!
    tenants: [User]!
    events: [Event]
    items: [Giving]
    posts: [Post]!
    Date: Date!
  }
  input createCommunity {
    name: String
    address: String!
  }
`;
