const express = require('express')
const port = 2005
require('dotenv').config();

const route = require('./routes/route')
const path = require('path')
const database = require('./config/database')
const cookie = require('cookie-parser')
const passport = require('./middleware/passport')
const session = require('express-session')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(cookie())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(session({
    secret: 'rnw',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.checkauthrise)
app.use('/', route)

app.listen(port, (err) => err ? console.log(err) : console.log('Server Started...'))