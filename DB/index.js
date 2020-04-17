const mongoose = require("mongoose");
module.exports = async () => {
  mongoose.set("debug", true);
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to DB " + process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
