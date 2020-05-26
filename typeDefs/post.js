const { gql } = require("apollo-server-express");
module.exports.post = gql`
  extend type Query {
    getPosts(communityId: ID!): [Post]
    getPost(postId: ID!): GetPost
  }

  extend type Mutation {
    createPost(userInput: createPost): Post
    updatePost(userInput: updatePost): Post
    deletePost(id: ID!): Post
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    creator: ID!
    createdAt: Date!
  }
  type GetPost {
    id: ID!
    title: String!
    description: String!
    creator: User
    createdAt: Date!
  }
  input createPost {
    title: String!
    description: String!
    creator: ID!
    community: ID!
  }
  input updatePost {
    id: ID!
    title: String!
    description: String!
  }
`;
