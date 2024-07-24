const Product = require("../../models/product.model");

const filterByStatusHelpers = require("../../helpers/filterByStatus");
const searchByKeywordHelpers = require("../../helpers/searchByKeyword");
const paginationHelpers = require("../../helpers/pagination");
const { prefixAdmin } = require("../../config/system");

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

  const products = await Product
    .find(find)
    .sort({ position: "desc", _id: "desc" })
    .limit(pagination.limit)
    .skip(pagination.skip);

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

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Changed Status");
  res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const action = req.body.status;
  const ids = req.body.ids.split(", ");

  switch (action) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });

      req.flash("success", `Changed Status ${ids.length} Items`);
      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });

      req.flash("success", `Changed Status ${ids.length} Items`);
      break;

    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      });

      req.flash("success", `Deleted ${ids.length} Items`);
      break;

    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-");
        await Product.updateMany({ _id: id }, { position: position });
      }

      req.flash("success", `Changed Position ${ids.length} Items`);
      break;
    default:
      break;
  }

  res.redirect("back");
}

// [DELETE] /admin/products/delete-item
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne({ _id: id }, {
    deleted: true,
    deletedAt: new Date()
  });

  req.flash("success", `Deleted`);
  res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Create A Product"
  });
}

// [POST] /admin/products/create
module.exports.createItem = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position === "") {
    const products = await Product.find({});
    req.body.position = 0;
    products.forEach(item => {
      if (req.body.position < item.position) {
        req.body.position = item.position;
      }
    });
    ++req.body.position;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  await Product.create(req.body);

  res.redirect(`${prefixAdmin}/products`);
}