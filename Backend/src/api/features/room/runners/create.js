const handler = ({ model }, _) => async (req, res) => {
  const { TenPhong, TongSoGhe } = req.body
  if (!TenPhong) {
    res.send({ error: 'Ten Phong is required.' })
  } else if (!TongSoGhe) {
    res.send({ error: 'Tong So Ghe is required.' })
  } else {
    try {
      let listparams = {
        TenPhong: TenPhong
      }
      const ghe = await model.find(listparams)

      if (ghe.length != 0) {
        res.send({ error: 'Phong exist!' })
      } else {
        const result = await model.insertMany(req.body)
        result && res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('createPhong', 'post', handler)

module.exports = runner