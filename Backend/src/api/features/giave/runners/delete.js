const handler = ({ model }, _) => async (req, res) => {
  const { LoaiVe } = req.body
  console.log(req.body)
  if (!LoaiVe) {
    res.send({ error: 'Loai Ve is required.' })
  } else {
    try {
      const result = await model.updateMany(
        { LoaiVe: LoaiVe },
          { $set: { 
            deleted: true
            }
          }
       )
      
      result && res.send({ result })
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('deleteTicketType', 'put', handler)

module.exports = runner