const userSchema = require("../models/userSchema");

async function otpController(req, res) {
  const { email, otp } = req.body;
  const user = await userSchema.findOne({email});
  if (!user) {
    return res.status(400).json({ error: "User is not found" });
  }
  if (user.isVerified) {
    return res.json({ message: "user is verified" });
  }
  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

//   This is normal way
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();


// This is MongoDB way
// const updatedUser = await userSchema.findOneAndUpdate(
//     {email},
//     {$set : {isVerified : true}},
//     {$unset: {otp: "",otpExpiry: ""}},
//     {new: true},
// )

  res.status(200).json({
    message : "Email verification successful"
  })
}
module.exports = otpController;
