const { gql } = require("apollo-server-express");
module.exports.giving = gql`
  type Giving {
    title: String!
    description: String!
    where: String!
    type: givingType
    participants: [User]
    date: Date!
  }
  enum givingType {
    Item
    Service
  }
`;
