const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const categoryhandler = require('../controller/categoryhandler')

route.use('/addcat', categoryhandler.addcategory)

module.exports = route