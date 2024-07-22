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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne(
    {
      _id: id
    },
    {
      status: status
    }
  );

  res.redirect("back");
}

// [PATCH] /admin/products/change-multi-status
module.exports.changeMultiStatus = async (req, res) => {
  const status = req.body.status;
  const ids = req.body.ids.split(", ");

  await Product.updateMany(
    {
      _id: { $in : ids}
    },
    {
      status: status
    }
  );

  res.redirect("back");
}

// [DELETE] /admin/products/delete-item
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne(
  //   {
  //     _id: id
  //   }
  // );
  await Product.updateOne(
    {
      _id: id
    },
    {
      deleted: true,
      deletedAt: new Date()
    }
  );

  res.redirect("back");
}