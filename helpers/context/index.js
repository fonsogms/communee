const jwt = require("jsonwebtoken");
const User = require("../../DB/models/User");
module.exports.verifyUser = async (req) => {
  req.email = null;
  req.userId = null;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "mysecretkey"
    );
    if (payload) {
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });
      req.userId = user._id;
      console.log("this is user id:!", req.userId);
    }
  } catch (err) {
    console.log(err);
    //throw err;
  }
};
