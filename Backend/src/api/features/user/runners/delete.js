const handler = ({ model }, _) => async (req, res) => {
  const {email} = req.body

  if (!email) {
  res.send({ error: 'email is required.' })
  } else {
    try {
      const user = await model.findOne({ email })

      if (user) {
        const result = await model.updateMany(
          { email: email },
          { $set: { deleted: true }})

        result && res.send({ result })
      } else {
        res.send({ error: 'user is not found!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteuser', 'put', handler)

module.exports = runner