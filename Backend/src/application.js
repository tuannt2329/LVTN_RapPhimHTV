class Application {
  constructor (systemConfig, appConfig) {
    this.systemConfig = systemConfig
    this.appConfig = appConfig
  }

  initGlobal () {
    const Feature = require('./api/core/feature')
    const Runner = require('./api/core/runner')
    const Controller = require('./api/core/controller')

    global.Runner = Runner
    global.Feature = Feature
    global.Controller = Controller
  }

  initDb () {
    const mongoose = require('mongoose')
    const mongoConfig = this.systemConfig.mongo

    this.mongoose = mongoose.connect(mongoConfig.connectionString, mongoConfig.options, (err) => {
      if(err)
        console.log(err);
      else
        console.log("database is connected!");
    });
  }

  initServer () {
    const initServer = require('./api/core/server')

    const serverConfig = this.systemConfig.server

    const { server, express } = initServer(serverConfig)
    const protocol = serverConfig.server.useHttps ? 'https' : 'http'
    const host = serverConfig.server.host
    const port = serverConfig.server.port

    server.listen(
      port,
      () => console.log(`Server started: ${protocol}://${host}:${port}`)
    )

    this.server = server
    this.express = express
  }

  initFeatures () {
    const features = require('./api/features')

    features.forEach((feature) => {
      feature.controller.addConfig(this.appConfig)
      feature.controller.embedTo(this.express, feature.name)
    })
  }

  start () {
    this.initGlobal()
    this.initDb()
    this.initServer()
    this.initFeatures()
  }
}

module.exports = Application