const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')
const fs = require('fs')

module.exports.addsubcat = async (req, res) => {
    await categorySchema.find({}).then((data) => {
      
        res.render('addsubcategory', { data })
    })
}
module.exports.addsubcategory = async (req,res)=>{
    await subcategorySchema.create(req.body).then((data)=>{
       
        res.redirect('/subcategory/addsubcat')
    })
}

module.exports.viewsubcatgory = async (req,res) => {

  await subcategorySchema.find({}).populate("categoryid").then((data)=>{
    console.log(data)
    res.render('viewsubcatgory',{data})
  })   
}