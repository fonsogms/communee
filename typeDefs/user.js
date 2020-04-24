const { gql } = require("apollo-server-express");
module.exports.user = gql`
  extend type Query {
    user(name: String, email: String, id: ID): User!
  }
  extend type Mutation {
    user(name: String!, email: String!): User!
    createUser(userInput: createUser): User
    updateUser(userInput: updateUser): User
  }
  input createUser {
    name: String!
    email: String!
    address: String!
    password: String!
    profilePic: String
  }
  input updateUser {
    id: ID!
    name: String
    email: String
    password: String
    profilePic: String
    community: [ID]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    profilePic: String
    community: [ID]
    Date: Date
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
