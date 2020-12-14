const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://";

async function createProduct(req, res, next) {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Could not store data" });
  }
  client.close();
  res.json(newProduct);
}

async function getProducts(req, res, next) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
  });
  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Could not find data" });
  }
  client.close();
  res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
