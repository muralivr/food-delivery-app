const { foodModel } = require("../models/foodModel");
const fs = require("fs");

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  let image_filename = req.file.filename;
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });
    await food.save();
    res
      .status(201)
      .json({ success: true, message: "Food Added Successfully", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding food item", error });
  }
};

const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(201).json({ success: true, foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

const removeFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodModel.findById({ _id: id });
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: true, message: "Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = { addFood, foodList, removeFood };
