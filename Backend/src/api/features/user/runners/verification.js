const bcrypt = require('bcrypt')
const sendEmail = require('../send-email')

const verification = Math.floor(Math.random() * Math.floor(1000000))
global.verification = verification

const handler = ({ model }, _) => async (req, res) => {
  const { email } = req.body
  if (!email) {
    res.send({ error: 'Email is required.' })
  } else {
    const error = 'Your email is wrong.'
    try {
      let listparams = {
        email: email,
        deleted: false 
      }
      const user = await model.findOne(listparams)

      if (user) {
        const subject = 'Ma xac minh tai khoan'
        
        const result = sendEmail(user.email, subject, verification)
        result && res.send({ info: "email has been sent" })
      }
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }
}

const runner = new Runner('verification', 'post', handler)

module.exports = runner