const mongoose = require("mongoose");

const foodScheem = new mongoose.Schema({
  name: {
    type: String,
  },
  discription: {
    type: String,
  },
  price: {
    type: Number,
  },

  category: {
    type: String,
  },
  image: {
    type: String,
  },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodScheem);
module.exports = { foodModel };
