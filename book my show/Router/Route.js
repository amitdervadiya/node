const express = require('express')
const route = express.Router()
const clt = require('../controller/clt')
const multer = require('../middleware/MulterF')


route.get("/", clt.home)


module.exports = route