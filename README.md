**1. Download Library**
npm init
npm i express
npm i --save-dev nodemon
npm i pug
npm i dotenv
npm i mongoose
npm i method-override
npm i body-parser
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
