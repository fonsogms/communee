const Event = require("../DB/models/Events");
const Community = require("../DB/models/Community");
const { isAuthenticated } = require("./middleware/index");
const { combineResolvers } = require("graphql-resolvers");
module.exports.event = {
  Query: {
    getEvent: combineResolvers(
      isAuthenticated,
      async (parent, { id }, context) => {
        try {
          const event = await Event.findById(id);
          if (!event) {
            throw new Error("This event doesn't exist anymore");
          }
          return event;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
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
    updatePost: combineResolvers(
      isAuthenticated,
      async (parent, { userInput }, { req }) => {
        try {
          let event = await Event.findById(userInput.id);
          if (event.creator.toString() == req.userId.toString()) {
            event = await Event.findByIdAndUpdate(
              userInput.id,
              {
                title: userInput.title,
                description: userInput.description,
              },
              { new: true }
            );
            return event;
          }
          throw new Error(
            "You are not the creator of this event, you cannot delete it"
          );
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
    deleteEvent: combineResolvers(
      isAuthenticated,
      async (parent, { id, communityId }, { req }) => {
        try {
          const user = req.userId;
          let event = await Event.findById(id);
          if (!event) {
            throw new Error("This event doesn't exist anymore");
          }
          if (event.organizer.toString() == req.userId.toString()) {
            event = await Event.findByIdAndDelete(id);
            const community = await Community.findByIdAndUpdate(communityId, {
              $pull: { events: id },
            });

            return event;
          }
          throw new Error(
            "You are not the creator of this event, you cannot delete it"
          );
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    ),
  },
};
