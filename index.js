const express = require("express");
const dbconnection = require("./database/dbconnection");
const route = require("./router");
const app = express();
require('dotenv').config()

const port = 3000;
dbconnection();
app.use(route);

app.listen(port, (req, res) => {
  console.log("backend is running");
});
