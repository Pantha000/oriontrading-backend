const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const REFRESH_TOKEN = "1//04y6naGZ2KhjqCgYIARAAGAQSNwF-L9Ir2UYmJbfjDJS00Wi0wSSDodR1EykkiGStZEHQs3lwLBk1RqkcpsAjlJHBQc1jUkMUyEE"
const CLIENT_ID = "598459616990-bod3fdtap6ij0ahbeuar2e6nsggatpdf.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URL = "https://developers.google.com/oauthplayground"

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (options) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transpoter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        type: "OAuth2",
        user: "soulpark0@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOption = {
      from: process.env.MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    await transpoter.sendMail(mailOption);
  } catch (err) {
    console.log(err);
  }
};
module.exports = sendMail;

// REFRESH_TOKEN = "1//04Ov2_WlzI-7PCgYIARAAGAQSNwF-L9Irf_QfMzLAi7wpMzFhHg2UuSAQLyclajrxuvbcP3I9q8ZTw88BigNFzTxmDC8R0fMvyU4"
// CLIENT_ID = "448514247810-dbo8o1q7vbhni038tsjqu1c2lr3q3r3b.apps.googleusercontent.com"
// CLIENT_SECRET = "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"

// REDIRECT_URL = "https://developers.google.com/oauthplayground"

// const sendMail = async (options) => {
//   const transpoter = nodemailer.createTransport({
//     service: process.env.SMTP_SERVICE,
//     auth: {
//       user: process.env.SMTP_MAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });
//   const mailOption = {
//     from: process.env.SMTP_SERVICE,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };
//   await transpoter.sendMail(mailOption);
// };
// module.exports = sendMail;
