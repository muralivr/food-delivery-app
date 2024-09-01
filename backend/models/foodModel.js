const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Name is required
  },
  description: {
    type: String,
    required: true,  // Description is required
  },
  price: {
    type: Number,
    required: true,  // Price is required
    min: 0,          // Price should be a positive number
  },
  category: {
    type: String,
    required: true,  // Category is required
  },
  image: {
    type: String,
    required: true,  // Image filename is required
  },
});


const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
module.exports = { foodModel };
