const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

/**
 * upload.single('avatar') - informa que será feito uploade de apenas uma imagem
 * e que o nome do input é avatar
 */
routes.post('/signup', upload.single('avatar'), UserController.store)
routes.get('/signup', UserController.create)

// só para testar o login
routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
