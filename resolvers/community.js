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
