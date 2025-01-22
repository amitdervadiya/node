const express = require('express')
const route = express.Router();
const handler = require('../controller/handler')
const upload = require('../middleware/upload')
const passport = require('../middleware/passport')

route.get('/', handler.loginform)
route.post('/login', passport.authenticate('local', { failureRedirect: "/" }), handler.login)
route.get('/dashboard', passport.checkAuth, handler.dashboard)
route.get('/addAdmin', passport.checkAuth, handler.addAdmin)
route.get('/viewAdmin', passport.checkAuth, handler.viewAdmin)
route.post('/addNewAdmin', upload, handler.addNewAdmin)
route.get('/deletedata', handler.deleteAdmin)
route.get('/editdata', handler.editAdmin)
route.get('/profile', handler.profile)
route.post('/updateAdmin', upload, handler.updateAdmin)
route.get('/logout', handler.logout)

module.exports = route

