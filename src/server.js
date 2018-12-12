const express = require('express')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NOD_ENV !== 'production'
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new LokiStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions', 'session-store.db')
        }),
        saveUninitialized: true
      })
    )
  }

  /**
   * path.resolve - faz o ajuste da barra que será usada (padrão windows ou unix)
   */
  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    // instrui o Express a servir arquivos estáticos da pasta public
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

/**
 * Dificilmente será necessário importar alguma coisa diferente do express,
 * por isso a exportação foi somente de express
 */
module.exports = new App().express
