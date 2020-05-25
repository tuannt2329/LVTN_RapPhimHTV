const schema = require('./room-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const phongRunners = require('./runners')

const model = mongoose.model('phong', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(phongRunners)

const feature = new Feature(controller, 'phong')

module.exports = feature