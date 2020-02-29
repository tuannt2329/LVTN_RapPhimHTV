const bcrypt = require('bcrypt')

const queryCallback = (response, responseName) => {
  return (error, result) => {
    if (error) {
      response.send({ error })
    } else {
      if (responseName) {
        const responseObject = {}
        responseObject[responseName] = result

        response.send(responseObject)
      } else {
        response.send(result)
      }
    }
  }
}

const handler = ({ model }, _) => async (req, res) => {
  const { email, password } = req.body
  if (!email) {
    res.send({ error: 'Email is required.' })
  } else if (!password) {
    res.send({ error: 'Password is required.' })
  } else {
    const error = 'Your email or password are wrong.'

    try {
      const user = await model.findOne({ email })

      if (user) {
        const hashedPassword = user.password
        const result = await bcrypt.compareSync(password, hashedPassword)
        result && res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
    
    !res.headersSent && res.send({ error })
  }
}

const runner = new Runner('login', 'post', handler)

module.exports = runner