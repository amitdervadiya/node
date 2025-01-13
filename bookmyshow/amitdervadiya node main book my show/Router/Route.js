const express = require('express')
const route = express.Router()
const clt = require('../controller/clt')
const multer = require('../middleware/Multer')



route.get("/", clt.home)
route.get('/addmovie', clt.addmovie)
route.post('/adddata', multer, clt.addmoviepost)

module.exports = route