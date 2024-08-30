const { userModel } = require("../models/userModel.js");

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(201).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.status(201).json({ success: true, message: "Cart Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = userData.cartData;
    return res.status(201).json({ success: true, cartData });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
