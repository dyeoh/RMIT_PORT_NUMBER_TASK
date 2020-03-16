const nodemailer = require("nodemailer");
const config = require("../config")

const sendMail = async (to, message) => {
  let transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false, 
    port: 587, 
    auth: {
        user: config.OUTLOOK_EMAIL,
        pass: config.OUTLOOK_PASS
    },
    tls: {
        ciphers:'SSLv3'
    }
  })

  let info = await transport.sendMail({
    from: `"${config.OUTLOOK_NAME}" <${config.OUTLOOK_EMAIL}>`,
    to,
    subject: "Port Number Assignment",
    text: message,
    html: `<b>${message}</b>`
  });

  console.log("Message sent: %s", info.messageId)
}

module.exports = { sendMail }