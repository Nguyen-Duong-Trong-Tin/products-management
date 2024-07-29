**1. Download Library**
npm init
npm i express
npm i --save-dev nodemon
npm i pug
npm i dotenv
npm i mongoose

// To Using PATCH DELETE Method
npm i method-override

// To Using req.body
npm i body-parser

// To Using Alert
npm i express-flash
npm i cookie-parser
npm i express-session

// To Create Item
npm i mongoose-slug-updater // Create Slug
npm i multer // Upload Image
npm install --save tinymce // Word: https://www.tiny.cloud/docs/tinymce/latest/expressjs-pm/

"start": "nodemon --save-dev index.js"

const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

**2. Config Routes**
routes/client/index.route.js
routes/client/home.route.js

**3. Config Controllers**
controllers/client/home.route.js

**4. Config Views**
views/client/pages/home/index.pug
views/client/layouts/default/index.pug
views/client/partials/default/index.pug
views/client/mixins/box-head/index.pug

app.set('views', './views');
app.set('view engine', 'pug');

**5. Config Public**
public/css/style.css
public/js/script.js
public/images/

app.use(express.static('public'));

**6. Config Config**
config/database.js
config/system.js

await mongoose.connect(process.env.MONGO_URL);


const PATH_ADMIN = "/admin";
module.exports = {
  prefixAdmin: PATH_ADMIN
};

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

**7. Config Models**
model/product.model.js

const Product = mongoose.model('Product', ProductSchema, "products");

**8. Config Validates**
validates/admin/product.validate.js

**8. Config Middlewares**

**9. Features To Helpers**

**Filter By Status**
await Product.find(req.query.status);

location.href = `${prefixAdmin}/products?status=:status`;

**Search By Keyword**
await Product.find(new RegExp(req.query.keyword, "i"));

location.href = `${prefixAdmin}/products?keyword=:keyword`;

**Pagination**
pagination.skip = (pagination.currentPage - 1) * pagination.limit;
await Product.find(find).limit(pagination.limit).skip(pagination.skip);

location.href = `${prefixAdmin}/products?page=:page`;

**Change Status**
// Change A Item
await Product.updateOne({ _id: req.params.id }, { status: req.params.status });

formChangeStatus.setAttribute("action", `${prefixAdmin}/products/change-status/:status/:id?_method=PATCH`);

// Change Many Item
await Product.updateMany({ _id: { $in : $in { req.body.ids.split(", ") } }, { status: status });


+ formChangeMulti(action=`${prefixAdmin}/products/form-change-multi`)
    input(name="" value="")

formChangeMulti.action += "?_method=PATCH";
formChangeMulti.submit();

**Delete Item**
// Delete A Item
// await Product.deleteOne({ _id: req.params.id });
await Product.updateOne({ _id: req.params.id }, { deleted: true, deletedAt: new Date() });

formDeleteItem.action = `${prefixAdmin}/products/delete/:id?_method=DELETE`;
formDeleteItem.submit();

// Delete Many Item
await Product.updateMany({ _id: { $in: req.body.ids.split(", ") } }, { deleted: true, deletedAt: new Date() });


+ formChangeMulti(action=`${prefixAdmin}/products/form-change-multi`)
    input(name="" value="")

formChangeMulti.action += "?_method=PATCH";
formChangeMulti.submit();

**Change Position**
for (const item of req.body.ids.split(", ")) {
  const [id, position] = item.split("-");
  await Product.updateMany({ _id: id }, { position: position });
}


+ formChangeMulti(action=`${prefixAdmin}/products/form-change-multi`)
    input(name="" value="")

formChangeMulti.action += "?_method=PATCH";
formChangeMulti.submit();

**Create Item**
// Keywords:
//   deleted, timestamp.
//   slug, uploadFile.

await Product.create(req.body);

form(
    method="POST"
    action=`${prefixAdmin}/products/create`
)
  input(name="" value="")

**Edit Item**
await Product.updateOne({ _id: req.params.id }, req.body);

form(
    method="POST"
    action=`${prefixAdmin}/products/edit/${product.id}?_method=PATCH`
)
  input(name="" value="")

**Detail A Item**
// admin
await Product.findOne({ deleted: false, _id: req.params.id });

a(href=`${prefixAdmin}/products/detail/:id`)

// client
await Product.findOne({ deleted: false, status: "active", slug: req.params.slug });

a(href=`/products/:id`)

**Sort**
const sort = {};
if (req.query.sortKey && req.query.sortValue) {
  sort[req.query.sortKey] = req.query.sortValue;
} else {
  sort.position = "desc";
}
await Product.sort(sort);

location.href = "?sortKey=:key&sortValue=:value;

**Create Tree**
let count = 0;
const createTreeRecursion = (arr, parentId = "") => {
  const tree = [];
  arr.forEach(item => {
    if (item.parent_id === parentId) {
      const newItem = item;
      newItem.count = ++count;
      const children = createTreeRecursion(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}
module.exports.createTree = (arr, parentId = "") => {
  count = 0;
  return createTreeRecursion(arr, parentId);
}

mixin select-tree(items, level = 1)
  each item in items
    - const prefix = Array(level + 1).join("-- ")
    option(value=item.id) #{prefix}#{item.title}
      if (item.children && item.children.length > 0)
        +select-tree(item.children, level + 1)

const record = await ProductCategory.find(find);
const newRecord = createTreeHelpers.createTree(record);

if (record)
  +table-tree(record)

**10. DEPLOY**
DATABASE: https://cloud.mongodb.com/v2#/org/66a2100b6a30e3639c308ece/projects

VERCEL: https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel
vercel.json: "use": "@vercel/node"
index.js: __dirname

CLOUD:  https://cloudinary.com/
toturial: https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
