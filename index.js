const express = require("express");
const dbconnection = require("./database/dbconnection");
require('dotenv').config()
const route = require("./router");
const app = express();

const port = 3000;
app.use(express.json());
dbconnection();
app.use(route);

app.listen(port, (req, res) => {
  console.log("backend is running");
});
