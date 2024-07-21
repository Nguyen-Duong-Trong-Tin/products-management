const express = require('express');
require('dotenv').config();

const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const database = require("./config/database");
const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

// Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});