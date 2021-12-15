import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs/typeDefs";

const inputResolvers = {
  Query: resolvers,
};

const server = new ApolloServer({ typeDefs, resolvers: inputResolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
