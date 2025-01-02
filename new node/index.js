const express = require('express')
const port = 1008;
const path = require('path')
const app = express()
const schema = require('./model/firstschema')
const mongoose = require('./config/db')


app.set('view engine', 'ejs');
app.use(express.urlencoded())
app.get("/", (req, res) => {
    res.render("index", { title: "Home Page", message: "Welcome to my website!" })
})

app.post('/adddata', async (req, res) => {
    await schema.create(req.body).then((data) => {
        console.log(data)
        res.redirect('/')
    })


})

app.listen(port, (err) => {
    err ? console.log(err) : console.log('start on port 1008')
})