const handler = ({ model }, _) => async (req, res) => {
  const { TenPhong, TenFilm, ThoiGianChieu } = req.body
  if (!TenPhong) {
    res.send({ error: 'Ten Phong is required.' })
  } else if (!TenFilm) {
    res.send({ error: 'Ten Film is required.' })
  } else if (!ThoiGianChieu) {
    res.send({ error: 'Thoi Gian Chieu is required.' })
  } else {
    try {
      let listparams = {
        TenPhong: TenPhong,
        TenFilm: TenFilm,
        ThoiGianChieu: ThoiGianChieu
      }
      const schedule = await model.find(listparams)

      if (schedule.length != 0) {
        res.send({ error: 'Schedule exist!' })
      } else {
        const result = await model.insertMany(req.body)
        result && res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('createSchedule', 'post', handler)

module.exports = runner