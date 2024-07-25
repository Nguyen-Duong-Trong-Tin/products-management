const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product
    .find({
      status: "active",
      deleted: false
    })
    .sort({ position: "desc", _id: "desc" });

  const newProducts = products.map(item => {
    item.newPrice = (item.price / 100 * item.discountPercentage).toFixed(0);
    return item;
  });

  res.render("client/pages/products/index", {
    pageTitle: "Products",
    products: newProducts
  });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      status: "active",
      slug: req.params.slug
    };

    const product = await Product.findOne(find);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect("/products");
  }
}