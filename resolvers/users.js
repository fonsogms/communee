const User = require("../DB/models/User");
const Community = require("../DB/models/Community");

module.exports.user = {
  Query: {
    user: (parent, { name, email }, context, info) => {
      return { name, email };
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }, context, info) => {
      try {
        const user = await User.create({ ...userInput });
        if (user) {
          user.address = userInput.address;
          return user;
        } else {
          throw new Error("There was a prooblem creating user");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  User: {
    community: async ({ address }, args, context, info) => {
      try {
        let community = await Community.findOne({ address: address });
        console.log(community);
        if (!community) {
          community = await Community.create({ address });
          return [community._id];
        }
        return [community._id];
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
