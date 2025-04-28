const userSchema = require("../models/userSchema");
const emailVerification = require("../helpers/emailVerification");
async function resendOtpController(req, res) {
  try {
    const { email } = req.body;
    
    // Validate email presence
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check verification status
    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 300000; // 5 minutes

    // Update user record
    user.otp = newOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send new OTP email
    await emailVerification(email, newOtp);

    res.status(200).json({ 
      success: true,
      message: "New OTP sent successfully" 
    });

  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
}

module.exports = resendOtpController;