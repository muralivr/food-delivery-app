const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const { foodRouter } = require("./routes/foodRoute.js");
const { userRouter } = require("./routes/userRoute.js");
const dotenv = require("dotenv");
const { cartRouter } = require("./routes/cartRoute.js");
const { orderRouter } = require("./routes/orderRoute.js");
dotenv.config();

//app config
const app = express();
const PORT = 4000;

//middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

//db connection
connectDB();

//foodroute
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  return res.send("API is Looking");
});

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

//mongodb+srv://murali:12345@cluster0.8oy8w.mongodb.net/?
