const nodemailer = require("nodemailer");

async function emailVerification(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sheikhredoan99@gmail.com",
          pass: "qxqt jukb sdcs yluv",
        },
    });

    const info = await transporter.sendMail({
        from: '"Ecommerce 👻" <sheikhredoan99@gmail.com>', // sender address
        to: email,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>This is a demo ecommerce api here is the otp ${otp}</b>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
module.exports = emailVerification