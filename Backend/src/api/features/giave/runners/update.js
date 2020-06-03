const handler = ({ model }, _) => async (req, res) => {
  const {LoaiVe, GiaVe} = req.body

  if (!LoaiVe) {
  res.send({ error: 'Loai Ve is required.' })
  } else if (!GiaVe) {
  res.send({ error: 'Gia Ve is required.' })
  } else {
    try {
      let listparams = {
        LoaiVe: LoaiVe
      }
      const ve = await model.findOne(listparams)

      if (ve) {
        const result = await model.updateMany(
          { LoaiVe: LoaiVe },
          { $set: { 
            GiaVe: GiaVe
            }
          })

        result && res.send({ result })
      } else {
        return res.send({ error: 'Loai Ve don\'t exist!' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}

const runner = new Runner('updateGiaVe', 'put', handler)

module.exports = runner