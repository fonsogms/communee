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
        console.log("this is userInput", userInput);
        const user = await User.create({ ...userInput });
        if (user) {
          console.log("this is user", user.community);
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
};
