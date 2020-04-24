const Community = require("../DB/models/Community");
module.exports.community = {
  Query: {
    findCommunity: async (parent, args, context) => {},
  },
  Mutation: {
    createCommunity: async (
      parent,
      { userInput: { name, address } },
      context,
      info
    ) => {
      try {
        console.log("something?");
        const community = await Community.create({ name, address });
        console.log("resultado", community);
        if (!community) {
          throw new Error("Community already exist");
        }
        return community;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
