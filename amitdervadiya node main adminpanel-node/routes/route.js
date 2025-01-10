const express = require('express')
const handler = require('../controller/handler')
const upload = require('../middleware/upload')
const route = express.Router()
route.get('/', handler.loginform)
route.post('/login', handler.login)
route.get('/dashboard', handler.dashboard)
route.get('/addAdmin', handler.addAdmin)
route.get('/viewAdmin', handler.viewAdmin)
route.post('/addNewAdmin', upload, handler.addNewAdmin)
route.get('/deletedata', handler.deleteAdmin)
route.get('/editdata', handler.editAdmin)
route.post('/updateAdmin', upload, handler.updateAdmin)
route.get('/logout', handler.logout)

module.exports = route

