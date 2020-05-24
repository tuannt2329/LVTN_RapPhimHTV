const schema = require('././ghe-chema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const gheRunners = require('./runners')

const model = mongoose.model('ghe', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(gheRunners)

const feature = new Feature(controller, 'ghe')

module.exports = feature