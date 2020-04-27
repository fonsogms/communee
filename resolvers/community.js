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
        let community = await Community.findOne({ address: address });
        console.log("we find this community", community);
        if (!community) {
          community = await Community.create({ name, address });
        }
        console.log("we are sending this community", community);
        return community;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
