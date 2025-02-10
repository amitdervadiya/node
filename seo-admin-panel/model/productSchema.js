const mongoose = require('mongoose')
const schema = mongoose.Schema({
    subcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required: true,
    },
    productname: {
        required: true,
        type: String,
    },
    productprice: {
        required: true,
        type: Number,
    },
    productdescription: {
        required: true,
        type: String,
    },
   
})
const product = mongoose.model('product', schema)
module.exports = product