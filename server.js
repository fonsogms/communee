const express = require("express");
app = express();
const { ApolloServer } = require("apollo-server-express");
//environment setup

const dotenv = require("dotenv");

dotenv.config();

//connecting to the database
const connection = require("./DB/index");
connection();

//Cors setup
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
// APOLLO SERVER SETUP

//Requiring the typedefs and resolvers
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { req, res };
  },
});
server.applyMiddleware({ app, path: "/graphql", cors: false });
//comentario random

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
