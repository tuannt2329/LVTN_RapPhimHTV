const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  if (!listparams) {
    listparams['status'] = false
    const ticket = await model.find(listparams)
    return res.send({ ticket })
  } else {
    try {
      const ticket = await model.find(listparams)

      if (ticket.length != 0) {
        return res.send({ ticket })
      } else {
        return res.send({ error: 'ticket don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('find', 'post', handler)
module.exports = runner