const Stripe = require("stripe");
const { orderModel } = require("../models/orderModel.js");
const { userModel } = require("../models/userModel.js");
const dotenv = require("dotenv");
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing user order for frontend
const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  console.log(req.body);

  const frontendUrl = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });
    return res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//Best way to verify is using Webhooks, below code is temporary verification
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.status(201).json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(500).json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

//user order for frontend
const userOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await orderModel.find({ userId });
    return res.status(201).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

//list orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    return res.status(201).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

//api for status update for admin panel
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    return res.status(201).json({ success: true, message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
