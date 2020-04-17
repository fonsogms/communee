module.exports.user = {
  Query: {
    user: (parent, { name, email }, context, info) => {
      console.log("alfonso");
      return { name, email };
    },
  },
  Mutation: {
    user: (parent, { name, email }, context, info) => {
      console.log("alfonso");
      return { name, email };
    },
  },
};
