const schema = require('./ticket-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const ticketRunners = require('./runners')

const model = mongoose.model('ticket', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(ticketRunners)

const feature = new Feature(controller, 'ticket')

module.exports = feature