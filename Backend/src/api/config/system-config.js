const server = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000,
    useHttps: false,
    https: {
      key: 'your key.pem',
      cert: 'your cert.pem',
      passphrase: 'your passphrase'
    },
    baseUrl: '/'
  },
  middlewares: {
    static: {
      dotfiles: 'ignore',
      etag: true,
      extensions: false,
      fallthrough: true,
      immutable: false,
      index: 'index.html',
      lastModified: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      redirect: true,
      setHeaders: null,
      staticFolder: 'public'
    },
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: [],
      exposedHeaders: [],
      credentials: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      preflightContinue: false,
      optionsSuccessStatus: 204
    },
    morgan: 'dev',
    session: {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SECRET || 'nodejs-secret'
    },
    bodyParser: {
      json: {
        inflate: true,
        limit: '512KB',
        strict: true,
        type: 'application/json'
      },
      urlencoded: {
        extended: true,
        inflate: true,
        limit: '512KB',
        parameterLimit: 200,
        type: 'application/x-www-form-urlencoded'
      }
    }
  }
}

const mongo = {
  connectionString: "mongodb+srv://tuan:tuan@tuanhungcinema-19iln.mongodb.net/RapPhimHTV",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
}

module.exports = { server, mongo }