const express = require('express')
//const socketio = require('socket.io')
const cors = require('cors')
//const morgan = require('morgan')
//const helmet = require('helmet')
const bodyParser = require('body-parser')
//const session = require('express-session')

const initMiddlewares = (expressApp, options) => {
  expressApp.set('trust proxy', 1)

  expressApp.use(cors())
  //expressApp.use(helmet(options.helmet))
  //expressApp.use(morgan(options.morgan))
  expressApp.use(express.static(options.static.staticFolder, options.static))
  expressApp.use(bodyParser.json(options.bodyParser.json))
  expressApp.use(bodyParser.urlencoded(options.bodyParser.urlencoded))
  //expressApp.use(session(options.session))
}

module.exports = (options) => {
  const http = require(options.server.useHttps ? 'https' : 'http')
  const expressApp = express()
  const server = http.createServer(expressApp)
  //const io = socketio(server, options.socketIO)

  initMiddlewares(expressApp, options.middlewares)

  return { server, express: expressApp }
}
