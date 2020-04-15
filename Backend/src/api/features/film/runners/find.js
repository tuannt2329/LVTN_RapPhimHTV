const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  if (!listparams) {
    listparams['deleted'] = false
    const film = await model.find(listparams)
    return res.send({ film })
  } else {
    listparams['deleted'] = false
    try {
      const film = await model.find(listparams)

      if (film.length != 0) {
        return res.send({ film })
      } else {
        return res.send({ error: 'film don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('find', 'post', handler)

module.exports = runner