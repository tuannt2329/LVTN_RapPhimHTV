const handler = ({ model }, _) => async (req, res) => {
  const modeInstance = model(req.body)
  modeInstance.validateSync()
  const { email, TenFilm, TenPhong, TenGhe, ThoiGianChieu } = modeInstance
  if (!email) {
    res.send({ error: 'email is required.' })
  } else if (!TenFilm) {
    res.send({ error: 'Ten Film is required.' })
  } else if (!TenPhong) {
    res.send({ error: 'Ten phong is required.' })
  } else if (!TenGhe) {
    res.send({ error: 'Ten ghe is required.' })
  } else if (!ThoiGianChieu) {
    res.send({ error: 'Thoi gian chieu is required.' })
  } else {
    const error = 'Your email is wrong.'
    try {
      let listparams = { 
        email: email,
        TenFilm: TenFilm,
        TenPhong: TenPhong,
        TenGhe: TenGhe,
        ThoiGianChieu: ThoiGianChieu,
        status: false
      }
      const ticket = await model.findOne(listparams)
      
      if (ticket) {
        const result = await model.updateMany(
          { 
            email: email,
            TenFilm: TenFilm,
            TenPhong: TenPhong,
            TenGhe: TenGhe,
            ThoiGianChieu: ThoiGianChieu
          },
          {$set: {
            status: true,
            ThoiGianXacNhan: Date.now()
            }
          })

        result && res.send({ result })
      } else {
        return res.send({ error: 'ticket don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }
}

const runner = new Runner('updateStatus', 'put', handler)

module.exports = runner