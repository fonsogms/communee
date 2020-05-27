const Community = require("../DB/models/Community");
const Post = require("../DB/models/Post");
const User = require("../DB/models/User");
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
      async (parent, { userInput }, { req }) => {
        //console.log(args);
        try {
          userInput.creator = req.userId;
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
    updatePost: combineResolvers(
      isAuthenticated,
      async (parent, { userInput }, { req }) => {
        try {
          let post = await Post.findById(userInput.id);
          if (post.creator.toString() == req.userId.toString()) {
            post = await Post.findByIdAndUpdate(
              userInput.id,
              {
                title: userInput.title,
                description: userInput.description,
              },
              { new: true }
            );
            return post;
          }
          throw new Error(
            "You are not the creator of this post, you cannot delete it"
          );
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
    deletePost: async (parent, { id, communityId }, { req }) => {
      try {
        const user = req.userId;
        let post = await Post.findById(id);
        if (!post) {
          throw new Error("This post doesn't exist anymore");
        }
        if (post.creator.toString() == req.userId.toString()) {
          post = await Post.findByIdAndDelete(id);
          const community = await Community.findByIdAndUpdate(communityId, {
            $pull: { posts: id },
          });

          return post;
        }
        throw new Error(
          "You are not the creator of this post, you cannot delete it"
        );
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  GetPost: {
    creator: async ({ creator }) => {
      try {
        const user = await User.findById(creator);
        if (!user) {
          return "Creator doesn't exist anymore";
        }
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
