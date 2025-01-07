const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true

    },

})

const blueprint = mongoose.model('movie',schema)

module.exports = blueprint;