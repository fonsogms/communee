const express = require("express");
const User = require("./DB/models/User");
const { verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
app.use(express.json());
// APOLLO SERVER SETUP

//Requiring the typedefs and resolvers
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

app.post("/refresh_token", async (req, res) => {
  console.log("working");
  console.log(req.cookies);
  const token = req.cookies;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }
  let payload = null;
  try {
    payload = verify(token, process.env.JWT_SECRET_KEY || "mysecretkey");
    console.log(payload);
  } catch (err) {
    return res.send({ ok: false, accessToken: "" });
  }
  const user = await User.findOne({ id: payload.userId });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
  /*


  // token is valid and
  // we can send back an access token

 

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) }); */
});
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
