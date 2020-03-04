const handler = ({ model }, _) => async (req, res) => {
  const {TenFilm} = req.body

  if (!TenFilm) {
  res.send({ error: 'TenFilm is required.' })
  } else {

    try {
      const film = await model.findOne({ TenFilm })

      if (film) {
        const result = await model.updateMany(
          { TenFilm: TenFilm },
          { $set: { deleted: true }})

        result && res.send({ result })
      } else {
        res.send({ error: 'film not found!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deletefilm', 'put', handler)

module.exports = runner