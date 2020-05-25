const handler = ({ model }, _) => async (req, res) => {
  const { TenPhong } = req.body

  if (!TenPhong) {
    res.send({ error: 'Ten phong is required.' })
  } else {
    try {
      let listparams = { 
        TenPhong: TenPhong
      }
      const result = await model.deleteMany( listparams )
      
      result && res.send({ result })
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deletePhong', 'delete', handler)

module.exports = runner