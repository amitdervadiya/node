const express = require('express')
const route = express.Router()
const producthandler = require('../controller/producthandler')
const uploadproductimg = require("../middleware/uploadproductimg")

route.get('/addproduct',producthandler.addproduct)
route.post('/addproduct',uploadproductimg,producthandler.addproductin)
route.get('/viewproduct',producthandler.viewproduct)
route.get('/editproduct',uploadproductimg,producthandler.editproduct)
route.get('/deleteproduct',uploadproductimg,producthandler.deleteproduct)
route.post('/updateproduct',uploadproductimg,producthandler.updateproduct)

module.exports = route

