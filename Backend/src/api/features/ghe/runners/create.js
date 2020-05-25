const handler = ({ model }, _) => async (req, res) => {
  const { TenPhong, TenGhe } = req.body
  if (!TenPhong) {
    res.send({ error: 'Ten Phong is required.' })
  } else if (!TenGhe) {
    res.send({ error: 'Ten Ghe is required.' })
  } else {
    try {
      let listparams = {
        TenPhong: TenPhong,
        TenGhe: TenGhe
      }
      const ghe = await model.find(listparams)

      if (ghe.length != 0) {
        res.send({ error: 'Ghe exist!' })
      } else {
        const result = await model.insertMany(req.body)
        result && res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('createGhe', 'post', handler)

module.exports = runner