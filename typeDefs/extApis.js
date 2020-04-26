const { gql } = require("apollo-server-express");

module.exports.apis = gql`
  extend type Query {
    findAddress(address: String!): [Mapbox]
  }
  type Mapbox {
    place_name: String!
    center: [Float]
  }
`;
