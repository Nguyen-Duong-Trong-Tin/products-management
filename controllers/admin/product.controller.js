const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const statusParam = req.query.status;
  const keywordParam = req.query.keyword;

  const buttonsStatus = [
    {
      content: "All",
      status: "",
      active: ""
    },
    {
      content: "Active",
      status: "active",
      active: ""
    },
    {
      content: "Inactive",
      status: "inactive",
      active: ""
    }
  ];

  if (statusParam) {
    const idx = buttonsStatus.findIndex(item => item.status === statusParam);
    buttonsStatus[idx].active = "active";
  } else {
    buttonsStatus[0].active = "active";
  }

  const find = {
    deleted: false
  }

  if (statusParam) {
    find.status = statusParam;
  }

  if (keywordParam) {
    const regex = new RegExp(keywordParam, "i");
    find.title = regex;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Products",
    products: products,
    buttonsStatus: buttonsStatus,
    keyword: keywordParam
  });
}