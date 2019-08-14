const { gql } = require('apollo-server');

const typeDefs = gql`
  type Test {
    test: String
  }

  type RootQuery {
    test: Test
  }

  type Subscription {
    heartbeat: String!
  }

  schema {
    query: RootQuery
    subscription: Subscription
  }
`;

module.exports = typeDefs;
