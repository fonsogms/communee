const jwt = require("jsonwebtoken");
const User = require("../../DB/models/User");
module.exports.verifyUser = async (req) => {
  req.email = null;
  req.userId = null;
  try {
    const bearer = req.headers.authorization;
    let token = " ";
    if (bearer) {
      token = req.headers.authorization.split(" ")[1];
    }
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "mysecretkey"
    );

    if (payload) {
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });
      req.userId = user._id;
    }
  } catch (err) {
    console.log(err);
    //throw err;
  }
};
