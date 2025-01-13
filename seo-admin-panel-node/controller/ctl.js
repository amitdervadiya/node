const Schema = require("../model/schema")

module.exports.indexPage = (req, res) => {
    res.render('index')
}
module.exports.formPage = (req, res) => {
    res.render('form')
}
module.exports.tablePage = async(req, res) => {
    await Schema.find({}).then((data)=>{
        res.render('table',{data})

    })
}
module.exports.addData = async (req, res) => {
    req.body.image = req.file.path
    console.log(req.body)
    await Schema.create(req.body).then((data) => {
        console.log(data)
        res.redirect('/formPage') 
    })

}