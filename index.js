const { ApolloServer } = require("apollo-server"); // Import Apollo Server
const { importSchema } = require("graphql-import"); // Import graphql-import to load schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom EtherDataSource

const typeDefs = importSchema("./schema.graphql"); // Load schema from file

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  // Define resolvers for Query fields
  Query: { 
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver for etherBalanceByAddress
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver for totalSupplyOfEther
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver for latestEthereumPrice
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver for blockConfirmationTime
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Create EtherDataSource instance
  }), 
});

server.timeout = 0; // Set no timeout
server.listen("9000").then(({ url }) => { // Start server on port 9000
  console.log(`🚀 Server ready at ${url}`); 
});
