const schema = require('./film-schema')
const mongoose = require('mongoose')
const mongooseRunners = require('./../../core/mongoose-runners')
const filmRunners = require('./runners')

const model = mongoose.model('film', schema)
const controller = new Controller(model)
controller.registerRunner(mongooseRunners)
controller.registerRunner(filmRunners)

const feature = new Feature(controller, 'film')

module.exports = feature