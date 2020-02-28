const express = require('express')
const controller = new Controller()

controller.on(Controller.events.ADD_CONFIG, ({ uiRoutes, defaultHtml }) => {
  controller.router.use(uiRoutes, express.static(`public/${defaultHtml}`))
})

const feature = new Feature(controller)

module.exports = feature
