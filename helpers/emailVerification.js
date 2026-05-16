const nodemailer = require("nodemailer");

async function emailVerfication(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Motasim Ecommerce" <themotasimdev@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "OTP", // subject line
      text: "OTP Verification", // plain text body
      html: `<h1>Your OTP is: ${otp}</h1>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

module.exports = emailVerfication;
