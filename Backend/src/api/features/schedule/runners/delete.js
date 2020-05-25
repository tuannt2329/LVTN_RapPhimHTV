const handler = ({ model }, _) => async (req, res) => {
  const {TenFilm, TenPhong, ThoiGianChieu} = req.body

  if (!TenFilm) {
  res.send({ error: 'TenFilm is required.' })
  } else if (!TenPhong) {
    res.send({ error: 'Ten Phong is required.' })
  } else if (!ThoiGianChieu) {
    res.send({ error: 'Thoi Gian Chieu is required.' })
  } else {

    try {
      let listparams = {
        TenPhong: TenPhong,
        TenFilm: TenFilm,
        ThoiGianChieu: ThoiGianChieu
      }
      const schedule = await model.findOne(listparams)

      if (schedule) {
        const result = await model.updateMany(
          { TenFilm: TenFilm,
            TenPhong: TenPhong,
            ThoiGianChieu: ThoiGianChieu},
          { $set: { deleted: true }})

        result && res.send({ result })
      } else {
        res.send({ error: 'Schedule not found!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteSchedule', 'put', handler)

module.exports = runner