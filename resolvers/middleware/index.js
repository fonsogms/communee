const { skip } = require("graphql-resolvers");
module.exports.isAuthenticated = (parent, args, { req: { userId } }) => {
  try {
    if (!userId) {
      throw new Error("You are not authenticated");
    }
    skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
