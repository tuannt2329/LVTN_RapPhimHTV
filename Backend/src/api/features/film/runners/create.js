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
    let TongThu = '0'
    let TongChi = '0'
  
    const {TenFilm, DaoDien, TheLoai, TenNuocSX,
           TomTat, NgayChieu, NgayKetThuc} = req.body
    const AnhBia = "uploads/" + req.file.path.split('\\')[1]

    if(req.body.TongThu) {
      TongThu = req.body.TongThu
    }

    if(req.body.TongChi) {
      TongChi = req.body.TongChi
    }

    if (!TenFilm) {
    res.send({ error: 'TenFilm is required.' })
    } else if (!DaoDien) {
    res.send({ error: 'DaoDien is required.' })
    } else if (!TheLoai) {
      res.send({ error: 'TheLoai is required.' })
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
    } else if (NgayChieu >= NgayKetThuc) {
    res.send({ error: 'NgayChieu must < NgayKetThuc.' })
    } else {
      const data = {
        TenFilm, DaoDien, TheLoai, TenNuocSX, TomTat, NgayChieu,
        NgayKetThuc, AnhBia, TongThu, TongChi
      }
      try {
        const film = await model.findOne({ TenFilm })

        if (film) {
          if (!film.deleted) {
            return res.send({ error: 'film exist!' })
          } else {
            const result = await model.updateMany(
              { TenFilm: TenFilm },
              { $set: { 
                deleted: false,
                DaoDien: DaoDien,
                TheLoai: TheLoai,
                TenNuocSX: TenNuocSX,
                TomTat: TomTat,
                TongThu: TongThu,
                TongChi: TongChi,
                NgayChieu: NgayChieu,
                NgayKetThuc: NgayKetThuc,
                AnhBia: AnhBia
               }
              })

            result && res.send({ result })
          }
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