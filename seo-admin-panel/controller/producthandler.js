
const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const productSchema = require("../model/productSchema")

module.exports.addproduct = async(req, res) => {
    let subdata = await subcategorySchema.find({})
    res.render('addproduct',{subdata})
}

module.exports.addproductin = async (req, res) => {

    await productSchema.create(req.body).then(()=>{
        res.redirect('/product/addproduct')

    })
}
module.exports.viewproduct = async (req,res)=>{
    await productSchema.find({}).then((data)=>{
        res.render('viewproduct',{data})
    })
}

module.exports.deleteproduct = async (req,res)=>{
    await productSchema.findByIdAndDelete(req.query.id).then((data)=>{
        res.redirect('/product/viewproduct')
        })
}


module.exports.editproduct = async (req,res)=>{
    await productSchema.findById(req.query.id).then((data)=>{
        res.render('editproduct',{data})
        })

}

module.exports.updateproduct = async (req,res)=>{
    await productSchema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect('/product/viewproduct')
        })

}