const express = require("express");
const mongoose = require("mongoose");
// import model
const Product = require("./models/product.model.js");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", function (req, res) {
  res.send("Hello World");
});

// get single products from id
app.get("/api/products/:id", async (req, res) => {
  try {
    // const {id} = req.params;
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// add products
app.post("/api/products", async (req, res) => {
  // console.log(req.body, "post req");
  // res.send(req.body);

  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// update products
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin1@backenddb.f2lqprv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDb"
  )
  .then(() => {
    console.log("DB Connected!");
    app.listen(3000, () => {
      console.log("helo");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("connection failed");
  });
