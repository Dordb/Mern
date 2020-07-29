const mongoose = require("mongoose");

const Product = require("./models/product");

function conect() {
  mongoose
    .connect(
      "mongodb+srv://dorx:Po1NntCO0YlgIXGE@cluster0.ddgdu.mongodb.net/products_test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.log("*** Connection failled! ***\n" + error);
    });
}
function disconect() {
  mongoose.connection.close().then(() => {
    console.log("Conection Close");
  });
}

async function createProduct(req, res, next) {
  conect();
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  res.json(result);
  disconect();
}

async function getProducts(req, res, next) {
  conect();
  const products = await Product.find().exec();
  res.json(products);
  disconect();
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
