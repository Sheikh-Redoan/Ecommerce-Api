const express = require("express");
const route = express.Router();
const apiRoute = require("./api")
route.use("/api/v1", apiRoute)


module.exports = route;

