const handler = ({ model }, _) => async (req, res) => {
  let listparams = req.body
  
  try {
    const loaive = await model.find(listparams)

    if (loaive.length != 0) {
      return res.send({ loaive })
    } else {
      return res.send({ error: 'loai ve don\'t exist!' })
    }
  } catch (error) {
    res.send({ error })
  }
}

const runner = new Runner('find', 'post', handler)
module.exports = runner