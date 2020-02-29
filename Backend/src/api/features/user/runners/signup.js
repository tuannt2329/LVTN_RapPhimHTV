const handler = ({ model }, _) => async (req, res) => {
  const {firstName, lastName, gender, email, password } = req.body
  if (!firstName) {
    res.send({ error: 'first name is required.' })
  } else if (!lastName) {
    res.send({ error: 'last name is required.' })
  } else if (!email) {
    res.send({ error: 'Email is required.' })
  } else if (!password) {
    res.send({ error: 'Password is required.' })
  } else {
    try {
      const user = await model.findOne({ email })

      if (user) {
        res.send({ error: 'email exist!' })
      } else {
        const result = await model.create(req.body)
        result && res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('signup', 'post', handler)

module.exports = runner