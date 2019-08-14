const { gql } = require('apollo-server');

const typeDefs = gql`
  type Test {
    test: String
  }

  # type User {
  #   id: String
  #   username: String
  # }

  input InputMessage {
    username: String
    content: String
  }

  type Mutation  {
    # message(message: InputMessage): Message
    message(content: String username: String): Message
  }

  type Message {
    # id: String
    # userId: String
    username: String
    content: String
  }

  type RootQuery {
    test: Test
  }

  type Subscription {
    heartbeat: String
    message: Message
  }

  schema {
    query: RootQuery
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = typeDefs;
