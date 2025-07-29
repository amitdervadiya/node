const adminSchema = require('../model/adminSchema')
const fs = require('fs')

module.exports.loginform = async (req, res) => {
    res.render('login')

}

module.exports.login = async (req, res) => {
    res.redirect('/dashboard');
    let admin = await adminSchema.findOne({ email: req.body.email });
    if (admin) {
        if (admin.password === req.body.password) {
            res.cookie('AdminData', admin); 
            console.log('Cookies after login:', req.cookies);

        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};

module.exports.dashboard = (req, res) => {
    res.render('index');
    if (req.cookies && req.cookies.AdminData) {
        res.render('index');
    } else {
        res.redirect('/');
    }
};

module.exports.addAdmin = (req, res) => {
    res.render('addAdmin')
    if (req.cookies.AdminData) {
        res.render('addAdmin')
    }
    else {
        res.redirect('/')
    }

}
module.exports.viewAdmin = async (req, res) => {
    const adminData = await adminSchema.find({})
    res.render('viewAdmin', { adminData })
    if (req.cookies.AdminData) {
        const adminData = await adminSchema.find({})
        res.render('viewAdmin', { adminData })

    }
    else {
        res.redirect('/')
    }


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
module.exports.profile = (req, res) => {
    res.render('profile')
}

module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/');
};
