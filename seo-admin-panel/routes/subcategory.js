const express = require('express')
const route = express.Router()
const passport = require('../middleware/passportcheck')
const subcategoryhandler = require('../controller/subcategoryhandler')

route.get('/addsubcat',subcategoryhandler.addsubcat)
route.get('/viewsubcatgory',subcategoryhandler.viewsubcatgory)
route.post('/addsubcategory',subcategoryhandler.addsubcategory)

module.exports = route