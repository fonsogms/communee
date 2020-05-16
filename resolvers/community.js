const Community = require("../DB/models/Community");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./middleware/index");
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
};
