const User = require("../DB/models/User");
const Community = require("../DB/models/Community");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Response } = require("express");
const { isAuthenticated } = require("./middleware/index");
const { combinerResolvers } = require("graphql-resolvers");
module.exports.user = {
  Query: {
    user: (parent, { name, email }, context, info) => {
      return { name, email };
    },
  },
  Mutation: {
    createUser: async (parent, { userInput }, context, info) => {
      try {
        console.log("this is userInput", userInput);
        const hashedPassword = await bcrypt.hash(userInput.password, 12);

        const user = await User.create({
          ...userInput,
          password: hashedPassword,
        });
        if (user) {
          console.log("this is user", user.community);
          return user;
        } else {
          throw new Error("There was a prooblem creating user");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (parent, { email, password }, { res }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("user not found :(");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Wrong password :(");
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1h",
        });
        res.cookie("jid", token, {
          httpOnly: true,
          path: "/refresh_token",
        });
        return { token };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
