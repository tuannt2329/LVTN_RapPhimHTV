const handler = ({ model }, _) => async (req, res) => {
  const {TenFilm, TenPhong, ThoiGianChieu, ThoiGianKetThuc, _id} = req.body

  if (!TenFilm) {
  res.send({ error: 'TenFilm is required.' })
  } else if (!TenPhong) {
  res.send({ error: 'Ten Phong is required.' })
  } else if (!ThoiGianChieu) {
    res.send({ error: 'Thoi Gian Chieu is required.' })
  } else if (!ThoiGianKetThuc) {
  res.send({ error: 'Thoi Gian Ket Thuc is required.' })
  } else if (!_id) {
    res.send({ error: 'id is required.' })
  } else {
    try {
      let listparams = {
        _id: _id
      }
      const shedule = await model.findOne(listparams)

      if (shedule) {
        const result = await model.updateMany(
          { _id: _id },
          { $set: { 
            TenPhong: TenPhong,
            ThoiGianChieu: ThoiGianChieu,
            ThoiGianKetThuc: ThoiGianKetThuc
            }
          })

        result && res.send({ result })
      } else {
        return res.send({ error: 'schedule don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('updateSchedule', 'put', handler)

module.exports = runner