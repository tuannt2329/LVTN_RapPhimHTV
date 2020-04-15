const { Router } = require('express')
const { EventEmitter } = require('events')

class Controller extends EventEmitter{
  constructor (model) {
    super()
    this.router = new Router()

    //test create film
    this.router.get('/',function(req,res){
      res.sendFile("D:\\LVTN_RapPhimHTV\\Backend\\src\\api\\features\\film\\runners" + '/index.html');
     
    })
    if (model) {
      this.model = model
    }
  }

  embedTo (express, basePath) {
    this.basePath = basePath || '/'

    if (!this.basePath.startsWith('/')) {
      this.basePath = '/' + this.basePath
    }

    express.use(this.basePath, this.router)
  }

  addConfig (config) {
    this.config = config
    this.emit(Controller.events.ADD_CONFIG, config)
  }
  
  registerRunner (...runners) {
    const handleRegisterRunner = (runner) => {
      const path = runner.name.startsWith('/') ? runner.name : `/${runner.name}`
      this.router[runner.method](path, (req, res) => {
        try {
          runner.handle(this, runner)(req, res)
        } catch (e) {
          res.error(e)
        }
      })
    }

    if (runners) {
      runners.forEach(runner => {
        if (runner instanceof Array) {
          runner.forEach(r => handleRegisterRunner(r))
        } else {
          handleRegisterRunner(runner)
        }
      })
    }
  }


}

Controller.events = {
  ADD_CONFIG: 'addConfig'
}

module.exports = Controller