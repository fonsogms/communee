const { gql } = require("apollo-server-express");
module.exports.user = gql`
  extend type Query {
    user(name: String!, email: String!): User!
  }
  extend type Mutation {
    user(name: String!, email: String!): User!
    createUser(userInput: userProfile): User
    updateUser(userInput: userProfile): User
  }
  input userProfile {
    name: String!
    email: String!
    password: String!
    profilePic: String!
    community: [CommunityInput!]
  }
  type User {
    name: String!
    email: String!
    password: String!
    profilePic: String!
    community: [Community]

    Date: Date!
  }
`;

/*  complains: [
    {
      type: mongoose.Schema.Types.ObjectId,
      reference: "Complain",
    },
  ],
    events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      reference: "Event",
    },
  ],
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      reference: "Item",
    },
  ], */
