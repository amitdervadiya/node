
const mongoose = require('mongoose')


const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },

    publishdate: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true,
        
    }

})

const firstschema = mongoose.model('student', schema)
module.exports = firstschema