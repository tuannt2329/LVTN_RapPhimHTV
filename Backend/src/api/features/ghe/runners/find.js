const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  if (!listparams) {
    listparams['status'] = false
    const ghe = await model.find(listparams)
    return res.send({ ghe })
  } else {
    try {
      const ghe = await model.find(listparams)

      if (ghe.length != 0) {
        return res.send({ ghe })
      } else {
        return res.send({ error: 'ghe don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('find', 'post', handler)
module.exports = runner