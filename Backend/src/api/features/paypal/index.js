const schema = require('../giave/giave-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const giaveRunners = require('./runners')

const model = mongoose.model('paypal', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(giaveRunners)

const feature = new Feature(controller, 'paypal')

module.exports = feature