const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = { userRouter };
