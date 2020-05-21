const sendEmail = require('../../user/send-email')

const handler = ({ model }, _) => async (req, res) => {
  const {email, TenFilm, TenPhong, TenGhe, ThoiGianChieu, GiaVe } = req.body
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
      const result = await model.create(req.body)

      if(result) {
        const content = 'You have successfully bought tickets of HTV cinema'
        const subject = 'Successful ticket purchase'
        
        const a = await sendEmail(email, subject, content)
        res.send({ content: subject })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('createticket', 'post', handler)

module.exports = runner