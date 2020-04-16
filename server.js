const express = require("express");
app = express();
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
//environment setup
const dotenv = require("dotenv");
dotenv.config();

//Cors setup
app.use(cors());

app.use(express.json());
// APOLLO SERVER SETUP

//Requiring the typedefs and resolvers
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {},
});

//comentario random
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
