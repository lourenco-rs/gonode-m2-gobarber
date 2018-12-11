const path = require('path')
const crypto = require('crypto') // biblioteca própria do Node
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    // se essa informação não for configurada será preservado o nome original
    filename: (req, file, cb) => {
      // esse código é da documentação do multer, padrão
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
