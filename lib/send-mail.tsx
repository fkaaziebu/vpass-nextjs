import nodemailer from "nodemailer";
import toast from "react-hot-toast";

export const sendMail = async (
  subject: string,
  toEmail: string,
  otpText: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    // Handle error and success cases here
  });
};
