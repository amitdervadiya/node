const schema = require('../model/Firstschema')
const fs = require('fs')
const path = require('path')

module.exports.home = (req, res) => {
    res.render('index')
}

module.exports.addmovie = (req, res) => {
    res.render('addmovie')
}

module.exports.addmoviepost = async (req, res) => {
    req.body.image = req.file.path
    await schema.create(req.body).then((data) => {
        console.log(data)
        res.redirect('/')
    })
}