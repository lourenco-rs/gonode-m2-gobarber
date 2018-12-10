const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')

routes.get('/signup', UserController.create)

/**
 * upload.single('avatar') - informa que será feito uploade de apenas uma imagem
 * e que o nome do input é avatar
 */
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes
