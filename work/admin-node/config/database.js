const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
const database = mongoose.connection;
database.once('open', (err) => {
    err ? console.log(err) : console.log('database connected...')
})
module.exports = database