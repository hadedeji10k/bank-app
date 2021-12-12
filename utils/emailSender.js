import transporter from "../config/emailConfig";
import env from "../config/environment/index";

const emailSender = async (email, subject, html) => {
  try {
    return new Promise((resolve, reject) => {

      let mailOptions = {
        from: env.MAIL.email,
        to: email,
        subject,
        html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
          return info.response;
        }
      });
    });
  } catch (error) {
    return false;
  }
};

export default emailSender;