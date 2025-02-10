
const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const productSchema = require("../model/productSchema")

module.exports.addproduct = async(req, res) => {
    let subcatdata = await subcategorySchema.find({})
    res.render('addproduct',{subcatdata})
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