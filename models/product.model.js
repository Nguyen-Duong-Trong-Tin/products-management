const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  position: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  deleted: Boolean
});

const Product = mongoose.model('Product', ProductSchema, "products");

module.exports = Product;