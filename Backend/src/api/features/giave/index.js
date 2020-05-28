const schema = require('./giave-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const giaveRunners = require('./runners')

const model = mongoose.model('giave', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(giaveRunners)

const feature = new Feature(controller, 'giave')

module.exports = feature