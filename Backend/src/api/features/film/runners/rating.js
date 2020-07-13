const handler = ({ model }, _) => async (req, res) => {
  
    const {TenFilm, Rating} = req.body
    try {
    const film = await model.findOne({ TenFilm })
    if (film) {
        const result = await model.updateMany(
        { TenFilm: TenFilm },
        { $set: { 
            Rating: Rating
            }
        })

        result && res.send({ result })
    } else {
        return res.send({ error: 'film don\'t exist!' })
    }
    } catch (error) {
    res.send({ error })
    }
  }
  
  const runner = new Runner('updaterating', 'put', handler)
  
  module.exports = runner