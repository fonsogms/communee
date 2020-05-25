const Event = require("../DB/models/Events");
const Community = require("../DB/models/Community");
const { isAuthenticated } = require("./middleware/index");
const { combineResolvers } = require("graphql-resolvers");
module.exports.event = {
  Query: {},
  Mutation: {
    createEvent: combineResolvers(
      isAuthenticated,
      async (parent, { userInput }, { req }) => {
        console.log(userInput, req.email, req.userId);
        try {
          let newEvent = { ...userInput };
          newEvent.organizer = req.userId;
          newEvent.participants = [req.userId];
          const event = await Event.create(newEvent);
          const community = await Community.findByIdAndUpdate(
            userInput.community,
            {
              $push: { events: event },
            }
          );

          return event;
        } catch (err) {
          throw err;
        }
      }
    ),
  },
};
