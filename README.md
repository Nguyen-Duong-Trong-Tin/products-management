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

// To Using alert
npm i express-flash
npm i cookie-parser
npm i express-session

// To Create Item
npm i mongoose-slug-updater // Create slug
npm i multer // Upload file

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

**7. Config Model**

const Product = mongoose.model('Product', ProductSchema, "products");

**8. Features To Helpers**

**Filter By Status**
await Product.find(req.query.status);

location.href = "/admin/products?status=:status";

**Search By Keyword**
await Product.find(new RegExp(keywordParam, "i"));

location.href = "/admin/products?keyword=:keyword";

**Pagination**
pagination.skip = (pagination.currentPage - 1) * pagination.limit;
await Product.find(find).limit(pagination.limit).skip(pagination.skip);

location.href = "/admin/products?page=:page";

**Change Status**
// Change a item
await Product.updateOne({ _id: req.params.id }, { status: req.params.status });

formChangeStatus.setAttribute("action", "/admin/products/change-status/:status/:id?_method=PATCH");

// Change many item
await Product.updateMany({ _id: { $in : $in { req.body.ids.split(", ") } }, { status: status });


+ formChangeMulti(action="/admin/products/:feature")
    input(name="" value="")

formChangeMulti.action += "?_method=PATCH";
formChangeMulti.submit();

**Delete Item**
// Delete a item
// await Product.deleteOne({ _id: id });
await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });

formDeleteItem.action = "/admin/products/delete/:id?_method=DELETE";
formDeleteItem.submit();

// Delete many item
await Product.updateMany({ _id: { $in: req.body.ids.split(", ") } }, { deleted: true, deletedAt: new Date() });


+ formChangeMulti(action="/admin/products/:feature")
    input(name="" value="")

formChangeMulti.action += "?_method=PATCH";
formChangeMulti.submit();
