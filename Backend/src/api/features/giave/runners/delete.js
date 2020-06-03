const handler = ({ model }, _) => async (req, res) => {
  const { LoaiVe } = req.body

  if (!LoaiVe) {
    res.send({ error: 'Loai Ve is required.' })
  } else {
    try {
      let listparams = { 
        LoaiVe: LoaiVe
      }
      const result = await model.deleteMany( listparams )
      
      result && res.send({ result })
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteTicketType', 'delete', handler)

module.exports = runner