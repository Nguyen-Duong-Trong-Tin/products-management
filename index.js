const express = require('express');
const path = require('path');
require('dotenv').config();

const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const database = require("./config/database");
const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser("RANDOMDFJKLAFJLKA"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});