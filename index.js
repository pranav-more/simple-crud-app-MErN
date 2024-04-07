const express = require("express");
const mongoose = require("mongoose");
// import model
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", function (req, res) {
  res.send("Hello World");
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
