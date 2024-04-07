const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");

// show products | get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
