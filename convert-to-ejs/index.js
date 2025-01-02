const express = require('express')
const port = 1008
const path = require("path")
const app = express()

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Server is running on port ${port}`)
    }
})