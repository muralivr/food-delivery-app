const express = require("express");
const multer = require("multer");
const {
  addFood,
  foodList,
  removeFood,
} = require("../controllers/foodController.js");

const foodRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);

//food list
foodRouter.get("/list", foodList);

//remove food
foodRouter.delete("/remove/:id", removeFood);

module.exports = { foodRouter };
