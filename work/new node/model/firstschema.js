const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

const firstschema = mongoose.model('student', schema)
module.exports = firstschema