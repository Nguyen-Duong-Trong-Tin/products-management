const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductCategorySchema = new mongoose.Schema({
  position: Number,
  title: String,
  parent_id: {
    type: String,
    default: ""
  },
  description: String,
  thumbnail: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  slug: { type: String, slug: "title", unique: true }
}, {
  timestamps: true
});

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema, "products-category");

module.exports = ProductCategory;