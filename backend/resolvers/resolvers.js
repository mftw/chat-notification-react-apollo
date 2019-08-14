module.exports = {
  RootQuery: {},
  Mutation: {
    // mutation: async () => {

    // }
    createMessage: async (_, args, context) => {
      const { username, content } = args;
      
      if (!username || !content) throw new Error("missing username or content");

      const usernameCheck = username.trim();
      const contentCheck = content.trim();

      if (usernameCheck.length === 0 || contentCheck.length === 0)
        throw new Error("missing username or content");

      context.pubsub.publish("message", {
        message: {
          username: username,
          content: content,
          date: Date.now()
        },
      });
      return {
        username: username,
        content: content,
        date: Date.now()
      };
    },
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
