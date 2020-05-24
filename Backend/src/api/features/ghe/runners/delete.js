const handler = ({ model }, _) => async (req, res) => {
  const { TenGhe, TenPhong } = req.body

  if (!TenGhe) {
    res.send({ error: 'Ten Ghe is required.' })
  } else if (!TenPhong) {
    res.send({ error: 'Ten phong is required.' })
  } else {
    try {
      let listparams = { 
        TenGhe: TenGhe,
        TenPhong: TenPhong
      }
      const result = await model.deleteMany( listparams )
      
      result && res.send({ result })
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteGhe', 'delete', handler)

module.exports = runner