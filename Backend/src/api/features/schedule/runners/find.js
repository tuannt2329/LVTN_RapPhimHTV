const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  listparams["deleted"] = false
  
  try {
    const schedule = await model.find(listparams)

    if (schedule.length != 0) {
      return res.send({ schedule })
    } else {
      return res.send({ error: 'schedule don\'t exist!' })
    }
  } catch (error) {
    res.send({ error })
  }
}

const runner = new Runner('find', 'post', handler)
module.exports = runner