const SendEmail = require('../../user/send-email')
const mongoose = require('mongoose')
const FilmSchema = require('../../film/film-schema')
const filmsSC = mongoose.model('film', FilmSchema)

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
        const films = await filmsSC.find({TenFilm})
        if(films) {
          for(let z = 0; z < films[0].TheoDoi.length; z++) {
            if(films[0].TheoDoi[z] !== "") {
              const content = 'phim ' + TenFilm + ' bạn đang theo dõi đã có lịch chiếu mới!\n' +
                      "mời bạn bấm vào link bên dưới để biết thêm chi tiết\n" + 'httvcinemas.live'
              const subject = 'phim bạn đang theo dõi đã có lịch chiếu mới'
              await SendEmail(films[0].TheoDoi[z], subject, content)
            }
          }
        }
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