const express = require('express')
const port = 1008
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname,'public')))
app.use('/', require('./Router/Route'))



app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`listning on http://localhost:${port}`)    
})
