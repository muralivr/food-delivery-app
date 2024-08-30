const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://murali:12345@cluster0.8oy8w.mongodb.net/food-delv"
    );
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectDB };
