const schema = require('../model/Firstschema')
const fs = require('fs')


module.exports.home = (req, res) => {
    res.render('index')
}

module.exports.addmovie = (req, res) => {
    res.render('addmovie')
}