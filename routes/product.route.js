const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller.js");

// show products | get all products
router.get("/", getProducts);

// get single products from id
router.get("/:id", getProduct);

// Add a new product
router.post("/", createProduct);

// Update an existing product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// export router
module.exports = router;
