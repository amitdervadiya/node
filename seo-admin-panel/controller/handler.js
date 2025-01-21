const adminSchema = require('../model/adminSchema')
const fs = require('fs')

module.exports.loginForm = (req, res) => {
    res.render('login')
    // if (req.cookies.admin) {
    //     res.redirect('/dashboard')
    // } else {
    //     res.render('login')
    //     res.end()
    // }
}
module.exports.login = async (req, res) => {
    res.redirect('/dashboard')
    // const admin = await adminSchema.findOne({ email: req.body.email })
    // if (admin) {
    //     if (admin.password === req.body.password) {
    //         res.cookie('adminData', admin)
    //         res.redirect('/dashboard')
    //     } else {
    //         res.redirect('/')
    //     }
    // }
    // else {
    //     res.redirect('/')
    // }
}
module.exports.logout = (req, res) => {
    // res.clearCookie('adminData')
    req.session.destroy()
    res.redirect('/')
}
module.exports.dashboard = (req, res) => {
    res.render('dashboard')

    // if (req.cookies.adminData) {
    //     res.render('dashboard')
    //     res.end()
    // } else {
    //     res.redirect('/')
    // }
}
module.exports.viewAdmin = async (req, res) => {
    const admins = await adminSchema.find({})
    res.render('viewAdmin', { admins })
    res.end()
    // if (req.cookies.adminData) {
    //     const admins = await adminSchema.find({})
    //     res.render('viewAdmin', { admins })
    //     res.end()
    // } else {
    //     res.redirect('/')
    // }
}
module.exports.addAdmin = (req, res) => {
    res.render('addAdmin')
    // if (req.cookies.adminData) {


    // } else {
    //     res.redirect('/')
    // }
}
module.exports.addNewAdmin = async (req, res) => {
    req.body.img = req.file.path
    await adminSchema.create(req.body).then(() => {
        res.redirect('/viewAdmin')
    })
}
module.exports.delete = async (req, res) => {
    const admin = await adminSchema.findById(req.params.id)
    fs.unlinkSync(admin.img)
    await adminSchema.findByIdAndDelete(req.params.id).then(() => res.redirect('/viewAdmin'))
}
module.exports.edit = async (req, res) => {
    const admin = await adminSchema.findById(req.params.id)
    console.log(admin)
    res.render('edit', { admin })
    // if (req.cookies.adminData) {
    //     const admin = await adminSchema.findById(req.params.id)
    //     console.log(admin)
    //     res.render('edit', { admin })
    // } else {
    //     res.redirect('/')
    // }
}
module.exports.update = async (req, res) => {
    let img = ""
    const admin = await adminSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = admin.img
    req.file && fs.unlinkSync(admin.img)
    req.body.img = img
    await adminSchema.findByIdAndUpdate(req.body.id, req.body).then(() => res.redirect('/viewAdmin'))
}