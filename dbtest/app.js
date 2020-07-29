const express = require("express");
const bodyParser = require("body-parser");
const mongoFile = require("./mongo");

const app = express();

app.use(bodyParser.json());

app.post("/products", mongoFile.createProduct);

app.get("/products", mongoFile.getProducts);

app.listen(5000);
