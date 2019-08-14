// require('dotenv').config();

// const { ApolloServer } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const { createServer } = require("http");
// const Pubsub = require("./pubSub");
const pubsub = require('./pubSub');
import morgan from "morgan";


const app = express();
app.use(morgan("dev"));


// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // dataSources,
  context: ({req, res}) => ({req, res, pubsub})
});
server.applyMiddleware({app});

const GQL_PORT = process.env.PORT || 4000;

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)

setInterval(() => {
  // console.log(
  //   "dong dong" +
  //     Math.random()
  //       .toString()
  //       .slice(0, 5)
  // );
  pubsub.publish("heartbeat", {
    heartbeat: "server time: " + new Date().toString(),
  });
}, 1000);


httpServer.listen({ port: GQL_PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${GQL_PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${GQL_PORT}${
      server.subscriptionsPath
    }`
  );
});


// export all the important pieces for integration/e2e tests to use
module.exports = {
  typeDefs,
  resolvers,
  ApolloServer,
  server,
};
