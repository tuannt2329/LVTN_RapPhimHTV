const schema = require('./schedule-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const scheduleRunners = require('./runners')

const model = mongoose.model('schedule', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(scheduleRunners)

const feature = new Feature(controller, 'schedule')

module.exports = feature