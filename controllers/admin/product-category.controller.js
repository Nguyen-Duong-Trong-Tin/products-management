const ProductCategory = require("../../models/product-category.model");

const filterByStatusHelpers = require("../../helpers/filterByStatus");
const searchByKeywordHelpers = require("../../helpers/searchByKeyword");
const paginationHelpers = require("../../helpers/pagination");
const { prefixAdmin } = require("../../config/system");

// [GET] /admin/products-category
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

  pagination = await paginationHelpers(pagination, req.query, ProductCategory);
  // End Pagination

  // Sort
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort

  const records = await ProductCategory
    .find(find)
    .sort(sort)
    .limit(pagination.limit)
    .skip(pagination.skip);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Products Category",
    records: records,
    buttonsStatus: filterByStatus.buttonsStatus,
    keyword: req.query.keyword,
    pagination: pagination
  });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {

  res.render("admin/pages/products-category/create", {
    pageTitle: "Create A Product Category",
  });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {

  if (req.body.position === "") {
    const products = await ProductCategory.find({});
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

  await ProductCategory.create(req.body);

  res.redirect(`${prefixAdmin}/products-category`);
}

// [PATCH] /admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
  const status = req.body.status;
  const ids = req.body.ids.split(", ");

  switch (status) {
    case "active":
      await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Updated items`);
      break;
    case "inactive":
      await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Updated items`);
      break;
    case "delete-all":
      await ProductCategory.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash("success", `Updated items`);
      break;
    case "change-position":
      ids.forEach(async (item) => {
        const [id, position] = item.split('-');
        await ProductCategory.updateOne({ _id: id }, { position: position });
      });
      req.flash("success", `Updated items`);
      break;
    default:
      req.flash("warning", `Not match`);
      break;
  }

  res.redirect("back");
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const productCategory = await ProductCategory.findOne({ _id: id });
    res.render("admin/pages/products-category/detail", {
      pageTitle: "Detail Product Category",
      record: productCategory
    });
  } catch (error) {
    redirect("admin/products-category");
  }
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const productCategory = await ProductCategory.findOne({ _id: id });
    
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Edit A Product Category",
      record: productCategory
    });
  } catch (error) {
    res.redirect("/admin/products-category");
  }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
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

    const id = req.params.id;
    const record = req.body;

    await ProductCategory.updateOne({_id: id}, record);
    req.flash("Success", "Updated");
  } catch (error) {
    req.flash("Error", "Not Updated");
  }

  res.redirect("/admin/products-category");
}

// [DELETE] /admin/products-category/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductCategory.updateOne({_id: id}, {
      deleted: true,
      deletedAt: new Date()
    })
  } catch (error) {
    req.flash("Error", "Not Deleted");
  }
  
  res.redirect("back");
}