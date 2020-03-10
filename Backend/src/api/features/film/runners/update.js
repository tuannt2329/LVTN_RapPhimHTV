const handler = ({ model }, _) => async (req, res) => {
  let TongThu = '0'
  let TongChi = '0'

  const {TenFilm, DaoDien, TenNuocSX,
          TomTat, NgayChieu, NgayKetThuc} = req.body

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
  } else if (!TenNuocSX) {
  res.send({ error: 'TenNuocSX is required.' })
  } else if (!TomTat) {
  res.send({ error: 'TomTat is required.' })
  } else if (!NgayChieu) {
  res.send({ error: 'NgayChieu is required.' })
  } else if (!NgayKetThuc) {
  res.send({ error: 'NgayKetThuc is required.' })
  } else if (NgayChieu >= NgayKetThuc) {
  res.send({ error: 'NgayChieu must < NgayKetThuc.' })
  } else {
    try {
      const film = await model.findOne({ TenFilm })

      if (film) {
        const result = await model.updateMany(
          { TenFilm: TenFilm },
          { $set: { 
            deleted: false,
            DaoDien: DaoDien,
            TenNuocSX: TenNuocSX,
            TomTat: TomTat,
            TongThu: TongThu,
            TongChi: TongChi,
            NgayChieu: NgayChieu,
            NgayKetThuc: NgayKetThuc
            }
          })

        result && res.send({ result })
      } else {
        return res.send({ error: 'film don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('updatefilm', 'put', handler)

module.exports = runner