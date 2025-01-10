const adminSchema = require('../model/adminSchema')

module.exports.home = (req, res) => {
    res.render('index')
    res.end()
}
module.exports.addAdmin = (req, res) => {
    res.render('addAdmin')
    res.end()
}
module.exports.viewAdmin = async (req, res) => {
    const adminData = await adminSchema.find({})
    res.render('viewAdmin', { adminData })
    res.end()
}
module.exports.addNewAdmin = async (req, res) => {
    req.body.profile = req.file.path;
    await adminSchema.create(req.body).then((data) => {
        console.log(data)
        res.redirect('/addAdmin')
    })
}

module.exports.deleteAdmin = async (req, res) => {
    await adminSchema.findByIdAndDelete(req.query.id).then((data) => {
        console.log(data)
        res.redirect('/viewAdmin')
    })
}