const handler = ({ model }, _) => async (req, res) => {
  const { LoaiVe, GiaVe } = req.body
  if (!LoaiVe) {
    res.send({ error: 'Loai Ve is required.' })
  } else if (LoaiVe !== 'VIP' && LoaiVe !== 'COUPLE') {
    res.send({ error: 'ticket type is wrong.' })
  } else if (!GiaVe) {
    res.send({ error: 'Gia Ve is required.' })
  } else {
    try {
      let listparams = {
        LoaiVe: LoaiVe
      }
      const ve = await model.find(listparams)

      if (ve.length != 0) {
        res.send({ error: 'ticket type exist!' })
      } else {
        const result = await model.insertMany(req.body)
        result && res.send({ result })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('createTicketType', 'post', handler)

module.exports = runner