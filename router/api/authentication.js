const express = require("express");
const registrationController = require("../../controllers/registrationController");
const otpController = require("../../controllers/otpController");
const resendOtpController = require("../../controllers/resendOtpController");
const loginController = require("../../controllers/loginController");
const route = express.Router();

route.post("/registration", registrationController);
route.post("/otpverify", otpController);
route.post("/resendotp", resendOtpController);
route.post("/login", loginController);

module.exports = route;
