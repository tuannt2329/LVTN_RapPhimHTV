const Application = require('./application')
const config = require("./api/config");

const app = new Application(config.systemConfig,  config.appConfig)

app.start()