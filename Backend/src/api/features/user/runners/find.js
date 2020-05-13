const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  if (!listparams) {
    listparams['deleted'] = false
    const user = await model.find(listparams)
    return res.send({ user })
  } else {
    listparams['deleted'] = false
    try {
      const user = await model.find(listparams)

      if (user.length != 0) {
        return res.send({ user })
      } else {
        return res.send({ error: 'user don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('find', 'post', handler)

module.exports = runner