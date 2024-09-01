const { userModel } = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function createToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY);
  return token;
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User Already Exists" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: "Enter Valid Email Address" });
    }
    if (password.length < 8) {
      return res
        .status(401)
        .json({ success: false, message: "Please Enter Strong Password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const userRegistered = await newUser.save();
    const token = createToken(userRegistered._id);
    return res
      .status(201)
      .json({ success: true, message: "Account Created", token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message:"Register Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(user._id);
    return res
      .status(201)
      .json({ success: true, message: "Login Success", token });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message:"Login Server Error" });
  }
};

module.exports = { registerUser, loginUser };
