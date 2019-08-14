const { PubSub } = require("graphql-subscriptions");
// import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();


// const payload = {
//   commentAdded: {
//     id: "1",
//     content: "Hello!",
//   },
// };

// pubsub.publish("commentAdded", payload);

module.exports = pubsub;
