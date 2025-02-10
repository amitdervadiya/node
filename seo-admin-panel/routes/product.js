const express = require('express')
const route = express.Router()
const producthandler = require('../controller/producthandler')
const uploadproductimg = require("../middleware/uploadproductimg")

route.get('/addproduct',producthandler.addproduct)
route.post('/addproduct',uploadproductimg,producthandler.addproductin)
route.get('/viewproduct',producthandler.viewproduct)
route.get('/deleteproduct',producthandler.deleteproduct)
route.get('/editproduct',producthandler.editproduct)
route.post('/updateproduct',producthandler.updateproduct)

module.exports = route

