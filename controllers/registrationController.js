const { log } = require("console");
const emailValidation = require("../helpers/emailvalidation");
const passwordvalidation = require("../helpers/passwordvalidation");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailVerification = require("../helpers/emailVerification");
async function registrationController(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    return res.json({
      error: "FirstName & LastName is required",
    });
  }
  if (!email) {
    return res.json({
      error: "Email is Required",
    });
  }
  if (!emailValidation(email)) {
    return res.json({
      error: "email is not valid",
    });
  }
  if (!password) {
    return res.json({
      error: "Please give a password",
    });
  }
  if (!passwordvalidation(password)) {
    return res.json({
      error: "Please give a strong password",
    });
  }
  const existingEmail = await userSchema.find({ email });
  if (existingEmail.length > 0) {
    return res.json({
      error: "email is already in use.",
    });
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(otp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  bcrypt.hash(password, 10, function (err, hash) {
    const user = new userSchema({
      firstName,
      lastName,
      email,
      password: hash,
      otp,
      otpExpiry,
    });
    emailVerification(email,otp)
    user.save();
  });

  res.json({
    message: "Registration Successful",
    status: "Success",
  });
}
module.exports = registrationController;
