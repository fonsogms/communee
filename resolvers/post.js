const Community = require("../DB/models/Community");
const Post = require("../DB/models/Post");

module.exports.post = {
  Query: {},
  Mutation: {
    createPost: async (parent, { userInput }, context) => {
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
    },
  },
};
