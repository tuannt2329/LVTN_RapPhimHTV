const nodemailer = require('nodemailer')
const config = require("../../config/system-config")

sendEmail = ( recieverEmail, subject, content ) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tuanhungcinema@gmail.com',
        pass: config.server.email.password
    }
  })

  const mailOptions = {
    from: config.server.email.emailAddress,
    to: recieverEmail,
    subject: subject,
    text: content.toString()
  }

  return transporter.sendMail(mailOptions)
}

module.exports = sendEmail