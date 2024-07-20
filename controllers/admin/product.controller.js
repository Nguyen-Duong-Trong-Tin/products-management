const Product = require("../../models/product.model");

const filterByStatusHelpers = require("../../helpers/filterByStatus");
const searchByKeywordHelpers = require("../../helpers/searchByKeyword");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const filterByStatus = filterByStatusHelpers.filterByStatus(req.query);
  const searchByKeyWord = searchByKeywordHelpers.searchByKeyword(req.query);

  if (req.query.status) {
    find.status = filterByStatus.status;
  }

  if (req.query.keyword) {
    find.title = searchByKeyWord.keyword;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Products",
    products: products,
    buttonsStatus: filterByStatus.buttonsStatus,
    keyword: req.query.keyword
  });
}