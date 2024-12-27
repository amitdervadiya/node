
const mongoose = require('mongoose')


const schema = mongoose.schema({
    name: {
        type: string,
        required: true
    },
    subject: {
        type: string,
        required: true,
    },

    city: {
        type: string,
        required: true,
    }
})

const firstschema = mongoose.model('student', schema)
module.exports = firstschema