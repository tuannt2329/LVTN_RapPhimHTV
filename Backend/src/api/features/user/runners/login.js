const bcrypt = require('bcrypt')

const handler = ({ model }, _) => async (req, res) => {
  const { email, password } = req.body
  if (!email) {
    res.send({ error: 'Email is required.' })
  } else if (!password) {
    res.send({ error: 'Password is required.' })
  } else {
    const error = 'Your email or password are wrong.'

    try {
      let listparams = {
        email: email,
        deleted: false
      }
      const user = await model.findOne(listparams)
      if (user) {
        const hashedPassword = user.password
        const result = await bcrypt.compareSync(password, hashedPassword)
        result && res.send({ user })
      }
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }
}

const runner = new Runner('login', 'post', handler)

module.exports = runner