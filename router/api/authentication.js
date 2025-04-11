const express = require("express");
const registrationController = require("../../controllers/registrationController");
const route = express.Router();

route.get("/registration", registrationController);

module.exports = route;
