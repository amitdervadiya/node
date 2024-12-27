const express = require('express')
const port = 1008
const app = express()
const db = require('./config/db')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`started on port ${port}`)
})