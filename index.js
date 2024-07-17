const express = require('express');
const app = express();
const route = require("./routes/client/index.route");
const database = require("./config/database");

require('dotenv').config();

const port = process.env.PORT;

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

// Routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});