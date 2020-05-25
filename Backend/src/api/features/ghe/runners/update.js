const updatestatusbyTenPhong = (model, _) => async (req, res) => {
  const { TenPhong } = req.body
  if (!TenPhong) {
    res.send({ error: 'Ten Phong is required.' })
  } else {
    const error = 'Ten Phong is wrong.'
    try {
      let listparams = {
        TenPhong: TenPhong
      }
      const ghe = await model.find(listparams)
      if (ghe) {
        const result = await model.updateMany(
          {TenPhong: TenPhong},
          {$set:
            {status: false}
          })
        result && res.send({ result })
      } 
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }

}

const updatestatusbyTenGhe = (model, _) => async (req, res) => {
  const modeInstance = model(req.body)
  modeInstance.validateSync()
  const {TenPhong, TenGhe, status } = req.body
  if (!TenPhong) {
    res.send({ error: 'Ten Phong is required.' })
  } else if (!TenGhe) {
    res.send({ error: 'Ten Ghe is required.' })
  } else if (!status) {
    res.send({ error: 'status is required.' })
  } else {
    const error = 'Your TenPhong or TenGhe is wrong.'
    try {
      let listparams = {
        TenPhong: TenPhong,
        TenGhe: TenGhe
      }
      const ghe = await model.findOne(listparams)
      
      if (ghe) {
        const result = await model.updateMany(
          {TenPhong: TenPhong,
           TenGhe: TenGhe},
          {$set: {
              status: status
            }
          })
        result && res.send({ result })
      } 
    } catch (error) {
      res.send({ error })
    }

    !res.headersSent && res.send({ error })
  }

}

const handler = ({ model }, _) => async (req, res) => {
  if(!req.body.TenGhe) {
    updatestatusbyTenPhong(model, _)(req, res)
  } else {
    updatestatusbyTenGhe(model, _)(req, res)
  }
}

const runner = new Runner('updateStatus', 'put', handler)

module.exports = runner