const handler = ({ model }, _) => async (req, res) => {
  const { TenFilm, TenPhong } = req.body

  if (!TenFilm) {
    res.send({ error: 'Ten Film is required.' })
  } else if (!TenPhong) {
    res.send({ error: 'Ten phong is required.' })
  } else {
    try {
      let listparams = { 
        TenFilm: TenFilm,
        TenPhong: TenPhong
      }
      const result = await model.deleteMany( listparams )
      
      result && res.send({ result })
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteTicket', 'delete', handler)

module.exports = runner