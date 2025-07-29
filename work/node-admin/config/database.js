const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const database = mongoose.connection;
database.once('open', (err) => {
    err ? console.log(err) : console.log('database connected...')
})
module.exports = database