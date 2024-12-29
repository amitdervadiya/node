const express = require('express')
const port = 1008
const app = express()
const db = require('./config/db')
const path = require('path')
const schema = require('./model/firstschema')
const multer = require('multer')
app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.get('/', async (req, res) => {

    let data = await schema.find({});
    res.render('index', { data })
})
const Storagebook = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '' + Date.now())
    }
})

const upload = multer({ storage: Storagebook }).single('image')

app.use('/uploads', express.static(path.join(__dirname, 'uploads/')));

app.post('/adddata', upload, async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then((data) => {
        console.log(data)
        res.redirect('/')
    })
})

app.get('/editdata', async (req, res) => {
    await schema.findById(req.query.id).then((data) => {
        console.log(req.query.id)
        res.render('edit', { data })
    })
})
app.post('/updatedata', async (req, res) => {
    console.log(req.body.id)
    await schema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
        res.redirect('/')
    })
})

app.get('/deletedata', async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then((data) => {
        console.log(data)
        res.redirect('/');
    })
})

app.get("/education", async (req, res) => {
    let data = await schema.find({});
    res.render("education", { data })
})
app.get("/recipe", async (req, res) => {
    let data = await schema.find({});
    res.render("recipe", { data })
})
app.get("/History", async (req, res) => {
    let data = await schema.find({});
    res.render("History", { data })
})
app.get("/Fantasy", async (req, res) => {
    let data = await schema.find({});
    res.render("Fantasy", { data })
})
app.get("/random", async (req, res) => {
    let data = await schema.find({});
    res.render("random", { data })

})
app.get('/home', (req, res) => {
    res.redirect('/')
})


app.listen(port, (err) => {
    err ? console.log(err) : console.log(`started on port ${port}`)
})