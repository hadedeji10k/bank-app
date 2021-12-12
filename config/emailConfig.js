import nodemailer from "nodemailer";
import env from "./environment/index";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.MAIL.email,
    pass: env.MAIL.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const transporter = nodemailer.createTransport({
//     host: "mail.ikarely.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: env.MAIL.email,
//       pass: env.MAIL.password,
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });

export default transporter;
