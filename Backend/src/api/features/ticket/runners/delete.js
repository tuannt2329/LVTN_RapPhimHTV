const handler = ({ model }, _) => async (req, res) => {
  const { TenFilm, TenPhong, ThoiGianChieu } = req.body
  if (!TenFilm) {
    res.send({ error: 'Ten Film is required.' })
  } else if (!TenPhong) {
    res.send({ error: 'Ten phong is required.' })
  } else if (!ThoiGianChieu) {
    res.send({ error: 'Thoi gian chieu is required.' })
  } else {
    try {
      let paramstofind = { 
        TenFilm: TenFilm,
        TenPhong: TenPhong,
        ThoiGianChieu: req.body.ThoiGianChieu1,
        payed: false,
        status: false
      }
      const ticket = await model.find( paramstofind )
      let result = null
      if (ticket.length != 0) {
        if (ThoiGianChieu >= req.body.ThoiGianChieu1) {
          result = await model.deleteMany(paramstofind)
          result && res.send({ result })
        } else {
          result = "ok"
          res.send({ result })
        }
      } else {
        result = "ok"
        res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteTicket', 'post', handler)

module.exports = runner