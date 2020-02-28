const queryCallback = (response, responseName) => {
  return (error, result) => {
    if (error) {
      response.send({ error })
    } else {
      if (responseName) {
        const responseObject = {}
        responseObject[responseName] = result

        response.send(responseObject)
      } else {
        response.send(result)
      }
    }
  }
}

const deleteAndGetHandler = ({ model }, runner) => (req, res) => {
  model[runner.name](req.query || {}, queryCallback(res))
}

const updateHandler = ({ model }, runner) => (req, res) => {
  model[runner.name](req.query || {}, req.body, queryCallback(res))
}

const createHandler = ({ model }, runner) => (req, res) => {
  const modeInstance = model(req.body)
  modeInstance.validateSync()

  model[runner.name](req.body, queryCallback(res))
}

const countDocumentsHandler = ({ model }, runner) => (req, res) => {
  model[runner.name](req.query || {}, queryCallback(res, 'count'))
}

const paginateHandler = ({ model, config }) => (req, res) => {
  const query = req.query || {}
  const page = Math.max(parseInt(query.page), 1)
  const size = parseInt(query.size) || config.paginate.size
  const skip = (page - 1) * size
  const callback = async (error, data) => {
    if (error) {
      res.send({ error })
    } else {
      const total = await model.countDocuments({})
      const lastPage = Math.ceil(total / size)
      const paginate = {
        page,
        size,
        total,
        lastPage,
        hasNext: lastPage > page,
        hasPre: page > 1
      }

      res.send({ paginate, data })
    }
  }

  model
    .find({})
    .skip(skip)
    .limit(size)
    .exec(callback)
}

const method = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete'
}

const runners = [
  new Runner('deleteMany', method.delete, deleteAndGetHandler),
  new Runner('deleteOne', method.delete, deleteAndGetHandler),
  new Runner('findByIdAndDelete', method.delete, deleteAndGetHandler),
  new Runner('findOneAndDelete', method.delete, deleteAndGetHandler),

  new Runner('find', method.get, deleteAndGetHandler),
  new Runner('findById', method.get, deleteAndGetHandler),
  new Runner('findOne', method.get, deleteAndGetHandler),
  new Runner('countDocuments', method.get, countDocumentsHandler),
  new Runner('paginate', method.get, paginateHandler),

  new Runner('updateMany', method.put, updateHandler),
  new Runner('updateOne', method.put, updateHandler),
  new Runner('findByIdAndUpdate', method.put, updateHandler),
  new Runner('findOneAndUpdate', method.put, updateHandler),

  new Runner('create', method.post, createHandler)
]

module.exports = runners
