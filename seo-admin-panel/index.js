const express = require('express')
const port = 2000
const path = require('path')
const app = express()
const route = require('./routes/route')
const database = require('./config/database')
const cookie = require('cookie-parser')
const passport = require('./middleware/Passport')
const session = require('express-session')
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', route)

app.listen(port, err => err ? console.log(err) : console.log('Server Started...'))