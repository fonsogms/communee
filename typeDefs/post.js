const { gql } = require("apollo-server-express");
module.exports.post = gql`
  extend type Query {
    getPosts(communityId: ID!): [Post]
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(userInput: createPost): Post
    updatePost(userInput: updatePost): Post
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    creator: User
    Date: Date!
  }
  input createPost {
    title: String!
    description: String!
    creator: ID!
  }
  input updatePost {
    id: ID!
    title: String!
    description: String!
    Date: Date
  }
`;
