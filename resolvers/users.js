module.exports.user = {
  Query: {
    user: (parent, { name, email }, context, info) => {
      return { name, email };
    },
  },
  Mutation: {
    user: (parent, { name, email }, context, info) => {
      return { name, email };
    },
  },
};
