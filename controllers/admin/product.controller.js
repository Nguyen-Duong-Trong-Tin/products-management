const Product = require("../../models/product.model");

const filterByStatusHelpers = require("../../helpers/filterByStatus");
const searchByKeywordHelpers = require("../../helpers/searchByKeyword");
const paginationHelpers = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  // Filter
  const filterByStatus = filterByStatusHelpers(req.query);
  if (req.query.status) {
    find.status = filterByStatus.status;
  }
  // End Filter

  // Search
  const searchByKeyWord = searchByKeywordHelpers(req.query);
  if (req.query.keyword) {
    find.title = searchByKeyWord.keyword;
  }
  // End Search

  // Pagination
  let pagination = {
    currentPage: 1,
    limit: 4,
    skip: 0,
  };

  pagination = await paginationHelpers(pagination, req.query, Product);
  // End Pagination

  const products = await Product.find(find).limit(pagination.limit).skip(pagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Products",
    products: products,
    buttonsStatus: filterByStatus.buttonsStatus,
    keyword: req.query.keyword,
    pagination: pagination
  });
}