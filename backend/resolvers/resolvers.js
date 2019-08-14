

module.exports = {
  RootQuery: {},
  Mutation: {
    // mutation: async () => {

    // }
    message: async (_, args, context) => {
      context.pubsub.publish("message", { 
        message: {
          username: args.message.username, 
          content: args.message.content
        }
      })
      return {
        username: args.message.username, 
        content: args.message.content
      }
    }
  },
  Subscription: {
    heartbeat: {
      // subscribe: () => pubsub.asyncIterator("heartbeat"),
      // subscribe: (_, __, { pubsub }) => pubsub.publish("HEARTBEAT", { heartbeat: new Date() }),
      subscribe: (_, __, context) => {
        return context.pubsub.asyncIterator("heartbeat");
      },
    },
    message: {
      subscribe: (_, __, context) => {
        return context.pubsub.asyncIterator("message");
      },
    },
  },
};


// Payload Transformation
// When using subscribe field, it's also possible to manipulate the event payload before running it through the GraphQL execution engine.

// Add resolve method near your subscribe and change the payload as you wish:

// const rootResolver = {
//     Subscription: {
//         commentAdded: {
//           resolve: (payload) => {
//             return {
//               customData: payload,
//             };
//           },
//           subscribe: () => pubsub.asyncIterator('commentAdded')
//         }
//     },
// };