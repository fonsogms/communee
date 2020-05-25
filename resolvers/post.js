const Community = require("../DB/models/Community");
const Post = require("../DB/models/Post");
const { isAuthenticated } = require("./middleware/index");
const { combineResolvers } = require("graphql-resolvers");
module.exports.post = {
  Query: {
    getPost: combineResolvers(
      isAuthenticated,
      async (parent, { postId }, context) => {
        try {
          const post = await Post.findById(postId);
          if (!post) {
            throw new Error("This post doesn't exist anymore");
          }
          return post;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
  Mutation: {
    createPost: combineResolvers(
      isAuthenticated,
      async (parent, { userInput }, context) => {
        //console.log(args);
        try {
          const post = await Post.create(userInput);
          const community = await Community.findByIdAndUpdate(
            userInput.community,
            {
              $push: { posts: post },
            }
          );
          if (!community) {
            throw new Error("Community not found");
          }
          return post;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
};
