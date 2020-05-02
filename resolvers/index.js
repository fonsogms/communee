const { GraphQLDateTime } = require("graphql-iso-date");
const customDateScalarResolver = {
  Date: GraphQLDateTime,
};
const { user } = require("./users");
const { community } = require("./community");
const { apis } = require("./extApis");
module.exports = [user, community, apis, customDateScalarResolver];
