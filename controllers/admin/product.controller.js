const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
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

  if (req.query.status) {
    const idx = buttonsStatus.findIndex(item => item.status === req.query.status);
    buttonsStatus[idx].active = "active";
  } else {
    buttonsStatus[0].active = "active";
  }

  const find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Products",
    products: products,
    buttonsStatus: buttonsStatus
  });
}