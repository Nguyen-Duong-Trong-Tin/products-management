const Role = require("../../models/role.model");

const { prefixAdmin } = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  try {
    const find = { deleted: false };

    const records = await Role.find(find);

    res.render("admin/pages/roles/index", {
      pageTitle: "Roles",
      records: records
    });
  } catch (error) {
    res.redirect("back");
  }


}

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Create A Role"
  });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    await Role.create(req.body);

    req.flash("success", "Created A Role");
    res.redirect(`${prefixAdmin}/roles`);
  } catch (error) {
    req.flash("error", "Error when create a role");
    res.redirect("back");
  }
}

// [GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Role.findOne({ _id: id });
    
    res.render("admin/pages/roles/detail", {
      pageTitle: "Detail A Role",
      record: record
    });

  } catch (error) {
    res.redirect("back");
  }
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Role.findOne({ _id: id });

    res.render("admin/pages/roles/edit", {
      pageTitle: "Edit A Role",
      record: record
    });
  } catch (error) {
    res.redirect("back");
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const record = req.body;

    await Role.updateOne({ _id: id }, record);
    req.flash("success", "Updated");
    res.redirect(`${prefixAdmin}/roles`);
  } catch (error) {
    req.flash("error", "Not Updated");
    res.redirect("back");
  }
}

// [DELETE] /admin/roles/delete-item/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, {
      deleted: true,
      deletedAt: new Date()
    });
    req.flash("success", "Deleted");
  } catch (error) {
    req.flash("error", "Not Deleted");
  }

  res.redirect(`${prefixAdmin}/roles`);
}

