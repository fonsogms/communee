const { gql } = require("apollo-server-express");
module.exports.community = gql`
  extend type Query {
    community(id: ID): Community!
  }
  extend type Mutation {
    createCommunity(userInput: CommunityInput): Community
  }
  type Community {
    name: String!
    email: String!
    password: String!
    profilePic: String!
    Date: Date!
  }
  input CommunityInput {
    name: String!
    email: String!
    password: String!
    profilePic: String!
  }
`;
