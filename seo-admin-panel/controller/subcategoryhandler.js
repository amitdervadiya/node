const subcategorySchema = require('../model/subcategorySchema')
const categorySchema = require('../model/categorySchema')



module.exports.addsubcat = async (req,res)=>{
    let catdata = await categorySchema.find({})

        res.render('addsubcat',{catdata})
}

module.exports.addsubcategory = async (req,res)=>{
    await subcategorySchema.create(req.body).then((data)=>{
        res.redirect('/subcategory/addsubcat')
    })
}