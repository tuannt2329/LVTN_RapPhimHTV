const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('AnhBia')


const handler = ({ model }, _) => (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.send('error when trying to upload')
    }
    const {TenFilm, DaoDien, TenNuocSX, TomTat,
      NgayChieu, NgayKetThuc, TongThu, TongChi} = req.body
    const AnhBia = "uploads/" + req.file.path.split('\\')[1]
    
    if (!TenFilm) {
    res.send({ error: 'TenFilm is required.' })
    } else if (!DaoDien) {
    res.send({ error: 'DaoDien is required.' })
    } else if (!TenNuocSX) {
    res.send({ error: 'TenNuocSX is required.' })
    } else if (!TomTat) {
    res.send({ error: 'TomTat is required.' })
    } else if (!NgayChieu) {
    res.send({ error: 'NgayChieu is required.' })
    } else if (!NgayKetThuc) {
    res.send({ error: 'NgayKetThuc is required.' })
    } else if (!AnhBia) {
    res.send({ error: 'AnhBia is required.' })
    } else if (!TongThu) {
      TongThu = 0
    } else if (!TongChi) {
      TongChi = 0
    } else if (NgayChieu >= NgayKetThuc) {
    res.send({ error: 'NgayChieu must < NgayKetThuc.' })
    } else {
      const data = {
        TenFilm, DaoDien, TenNuocSX, TomTat, NgayChieu, NgayKetThuc, AnhBia, TongThu, TongChi
      }

      try {
        const film = await model.findOne({ TenFilm })

        if (film) {
          res.send({ error: 'film exist!' })
        } else {
          const result = await model.create(data)

          result && res.send({ result })
        }
      } catch (error) {
        res.send({ error })
      }
    }
  })
}

const runner = new Runner('createfilm', 'post', handler)

module.exports = runner