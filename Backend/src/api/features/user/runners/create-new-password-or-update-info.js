const bcrypt = require('bcrypt')
const sendEmail = require('../send-email')

const handlerCreateNewPassword = (model, _) => async (req, res) => {
  const modeInstance = model(req.body)
  modeInstance.validateSync()
  const {email, password } = modeInstance
  const verificationCode = parseInt(req.body.verificationCode)
  if (!email) {
    res.send({ error: 'Email is required.' })
  } else if (!password) {
    res.send({ error: 'Password is required.' })
  } else if (!verificationCode) {
    res.send({ error: 'Verification code is required.' })
  } else if (verificationCode != verification) {
    res.send({error: 'Your verification code is wrong.'})
  } else {
    const error = 'Your email is wrong.'
    try {
      let listparams = {
        email: email,
        deleted: false
      }
      const user = await model.findOne(listparams)

      if (user) {
        const result = await model.updateMany(
          {email: email},
          {$set:
            {password: password}
          })

        if(result) {
          const content = 'Your password has been changed successfully!'
          const subject = 'Changed password'
          sendEmail(user.email, subject, content)
          res.send({ content: subject })
        }
      } 
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }

}

const handlerUpdateInfo = (model, _) => async (req, res) => {
  const modeInstance = model(req.body)
  modeInstance.validateSync()
  const {firstName, lastName, gender, email, password } = modeInstance
  if (!firstName) {
    res.send({ error: 'first name is required.' })
  } else if (!lastName) {
    res.send({ error: 'last name is required.' })
  } else if (!email) {
    res.send({ error: 'Email is required.' })
  } else if (!password) {
    res.send({ error: 'Password is required.' })
  } else {
    const error = 'Your email is wrong.'
    try {
      let listparams = {
        email: email,
        deleted: false
      }
      const user = await model.findOne(listparams)
      
      if (user) {
        const result = await model.updateMany(
          {email: email},
          {$set: {
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              password: password
            }
          })

        if(result) {
          const content = 'Your personal details have been changed successfully!'
          const subject = 'Changed personal details'
          sendEmail(user.email, subject, content)
          res.send({ content: subject })
        }
      } 
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }

}

const handler = ({ model }, _) => async (req, res) => {
  if(req.body.verificationCode) {
    handlerCreateNewPassword(model, _)(req, res)
  } else {
    handlerUpdateInfo(model, _)(req, res)
  }
}

const runner = new Runner('updateInfo', 'put', handler)

module.exports = runner