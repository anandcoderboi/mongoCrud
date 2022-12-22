const express = require("express");

const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");


mongoose
  .connect("mongodb://localhost:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = new mongoose.model("Product", productSchema);

// Create a new Product
app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

//Read product

app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});

//Update product

app.patch("/api/v1/product/:id", async (req, res) => {
 

 const  product = await Product.updateOne({id: req.params.id},{
    $set:{name: req.body.name}
 })

  res.status(200).json({ success: true, product });
});



//delete product

app.delete("/api/v1/product/:id",async (req, res) => {
  const removedProduct= await Product.remove({id: req.params.id})
  res.status(200).json({ success: true,removedProduct });
})


app.listen(4500, () => {
  console.log("server is working http://localhost:4500");
});