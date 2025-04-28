const emailValidation = require("../helpers/emailvalidation");
const userSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.json({
      error: "Please give an email",
    });
  }
  if (!emailValidation(email)) {
    res.json({
      error: "email is not vaild",
    });
  }
  if (!password) {
    return res.json({
      error: "Please give a password",
    });
  }
  const existingUser = await userSchema.find({email})
  if(existingUser.length > 0){
    if (existingUser[0].isVerified == false) {
        return res.json({error: "email is not verified"})
    }else{
        bcrypt.compare(password, existingUser[0].password, function(err, result) {
            if(result){
                res.status(200).json({
                    message: "Login Successfully done"
                })
            }else{
                res.json({
                    error: "Invalid Password"
                })
            }
        });
    }
  }else{
    res.json({
        message: "Email is not Valid"
    })
  }
}
module.exports = loginController;