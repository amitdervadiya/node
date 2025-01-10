const adminSchema = require('../model/adminSchema')
const fs = require('fs')

module.exports.loginform = async (req, res) => {
    res.render('login')
}

module.exports.login = async (req, res) => {
    let admin = await adminSchema.findOne({ email: req.body.email })
    if (admin) {
        if (admin.password === req.body.password) {
            res.cookie('adminData', admin)
            res.redirect('/dashboard')
        }
        else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }

}
module.exports.dashboard = (req, res) => {
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

module.exports.editAdmin = async (req, res) => {
    await adminSchema.findById(req.query.id).then((data) => {
        res.render('editAdmin', { data })
    })
}
module.exports.updateAdmin = async (req, res) => {
    let img = ""
    let singleData = await adminSchema.findById(req.body.id)
    console.log(singleData)
    req.file ? img = req.file.path : img = singleData.profile
    req.file && fs.unlinkSync(singleData.profile)
    req.body.profile = img
    await adminSchema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
        res.redirect('/viewAdmin')
    })
}

module.exports.logput = (req,res)=>{
    
}