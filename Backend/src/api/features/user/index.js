const schema = require('./user-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const userRunners = require('./runners')

const model = mongoose.model('user', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(userRunners)

const feature = new Feature(controller, 'user')

module.exports = feature