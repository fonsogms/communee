const Community = require("../DB/models/Community");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./middleware/index");
const Posts = require("../DB/models/Post");
const Events = require("../DB/models/Events");
const Givings = require("../DB/models/Giving");
module.exports.community = {
  Query: {
    findCommunity: async (parent, { id }, context) => {
      console.log("find the user!");
      const community = await Community.findOne({ _id: id });
      return community;
    },
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
      const postsDB = await Posts.find({ _id: { $in: [...posts] } });
      return postsDB;
      // const posts = await Posts.find({ comm });
    },
    events: async ({ events }, args, context) => {
      const eventsDB = await Events.find({ _id: { $in: [...events] } });
      return eventsDB;
    },
    givings: async ({ givings }, args, context) => {
      const givingsDB = await Givings.find({ _id: { $in: [...givings] } });
      return givingsDB;
    },
  },
};
