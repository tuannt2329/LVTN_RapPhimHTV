const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  
  try {
    const room = await model.find(listparams)

    if (room.length != 0) {
      return res.send({ room })
    } else {
      return res.send({ error: 'room don\'t exist!' })
    }
  } catch (error) {
    res.send({ error })
  }
}

const runner = new Runner('find', 'post', handler)
module.exports = runner