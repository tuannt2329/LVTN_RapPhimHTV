const sendEmail = require('../../user/send-email')

const handler = ({ model }, _) => async (req, res) => {
  const {email, TenFilm, TenPhong, TenGhe, ThoiGianChieu, GiaVe, payed } = req.body
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
  } else if (!GiaVe) {
    res.send({ error: 'Gia ve is required.' })
  } else {
    try {
      let param = {
        TenFilm : TenFilm,
        TenPhong: TenPhong,
        TenGhe: TenGhe,
        ThoiGianChieu: ThoiGianChieu
      }
      const ticket = await model.find(param)

      if (ticket.length != 0) {
        res.send({ error: 'ticket exist!' })
      } else {
        const result = await model.create(req.body)

        if(result) {
          if(payed === true) {
            var content = 'You have successfully bought tickets of HTV cinema'
            var subject = 'Successful ticket purchase'
          } else {
            content = 'You have successfully booked tickets of HTV cinema'
            subject = 'Successful ticket booked'
          }
          const a = await sendEmail(email, subject, content)
          res.send({ content: subject })
      }
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('createticket', 'post', handler)

module.exports = runner