const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer();
const uploadCloudinary = require("../../helpers/uploadCloudinary");

const validate = require("../../validates/admin/product-category.validate");
const controller = require("../../controllers/admin/product-category.controller");

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloudinary,
  validate.createItem,
  controller.createPost
);

router.patch('/change-multi', controller.changeMulti);

router.get('/detail/:id', controller.detail);

router.get('/edit/:id', controller.edit);

router.patch(
  '/edit/:id',
  upload.single("thumbnail"),
  uploadCloudinary,
  validate.createItem,
  controller.editPatch
);

router.delete("/delete-item/:id", controller.delete);

module.exports = router;