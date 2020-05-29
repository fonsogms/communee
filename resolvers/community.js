const Community = require("../DB/models/Community");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./middleware/index");
const User = require("../DB/models/User");
const Posts = require("../DB/models/Post");
const Events = require("../DB/models/Events");
const Givings = require("../DB/models/Giving");
module.exports.community = {
  Query: {
    findCommunity: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { req }) => {
        try {
          /*  if (!id) {
            const user = await User.findById(req.userId);
            id = user.community;
          } */
          console.log("find the user!");
          const community = await Community.findOne({ _id: id });
          console.log(community);
          return community;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
  Mutation: {
    createCommunity: async (
      parent,
      { userInput: { name, address } },
      context,
      info
    ) => {
      try {
        let community = await Community.findOne({ address: address });
        if (!community) {
          community = await Community.create({ name, address });
        }
        return community;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Community: {
    posts: async ({ posts }, args, context) => {
      const postsDB = await Posts.find({ _id: { $in: [...posts] } })
        .sort({ updatedAt: -1 })
        .exec();
      console.log(postsDB);
      return postsDB;
      // const posts = await Posts.find({ comm });
    },
    events: async ({ events }, args, context) => {
      const eventsDB = await Events.find({ _id: { $in: [...events] } });
      console.log(eventsDB);
      return eventsDB;
    },
    givings: async ({ givings }, args, context) => {
      const givingsDB = await Givings.find({ _id: { $in: [...givings] } });
      return givingsDB;
    },
  },
};
