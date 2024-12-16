const express = require("express");
let Books = [

    {
        id: '1',
        name: "A Brief History of Time",
        author: "Stephen Hawking",
        publishdate: "1988-03-01",
        category: "Education",
        image: "https://covers.openlibrary.org/b/id/8164661-L.jpg"
    },
    {
        id: '2',
        name: "The Elements of Style",
        author: "William Strunk Jr. & E.B. White",
        publishdate: "1918-01-01",
        category: "Education",
        image: "https://covers.openlibrary.org/b/id/7222241-L.jpg"
    },
    {
        id: '3',
        name: "Salt, Fat, Acid, Heat",
        author: "Samin Nosrat",
        publishdate: "2017-04-25",
        category: "Recipe",
        image: "https://covers.openlibrary.org/b/id/8288276-L.jpg"
    },
    {
        id: '4',
        name: "The Joy of Cooking",
        author: "Irma S. Rombauer",
        category: "Recipe",
        publishdate: "1931-01-01",
        image: "https://covers.openlibrary.org/b/id/8164772-L.jpg"
    },
    {
        id: '5',
        name: "The Diary of a Young Girl",
        author: "Anne Frank",
        publishdate: "1947-06-25",
        category: "History",
        image: "https://covers.openlibrary.org/b/id/8235915-L.jpg"
    },
    {
        id: '6',
        name: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        publishdate: "1997-03-01",
        category: "History",
        image: "https://covers.openlibrary.org/b/id/8315136-L.jpg"
    },
    {
        id: '7',
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        publishdate: "1937-09-21",
        category: "Fantasy",
        image: "https://covers.openlibrary.org/b/id/8221251-L.jpg"
    },
    {
        id: '8',
        name: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        publishdate: "1997-06-26",
        category: "Fantasy",
        image: "https://covers.openlibrary.org/b/id/8365294-L.jpg"
    }
];

;

const port = 1008;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("index", { Books });
});

app.post("/adddata", (req, res) => {
    req.body.id = String(Date.now())
    Books.push(req.body);
    res.redirect("/");
});

app.get("/deletedata", (req, res) => {
    const deleteid = String(req.query.id);
    Books = Books.filter((el) => el.id !== deleteid);
    res.redirect("/");
});
app.get('/editdata', (req, res) => {

    console.log(req.query.id)
    const updateid = req.query.id
    const singledata = Books.find((item) => item.id === updateid);
    res.render('edit', { singledata })
    console.log(singledata)

})

app.post("/updatedata", (req, res) => {
    const updateid = req.body.id;

    Books.forEach((e) => {
        if (e.id === updateid) {
            e.name = req.body.name;
            e.category = req.body.category;
            e.publishdate = req.body.publishdate;
            e.author = req.body.author;
            e.image = req.body.image
        }
    });

    res.redirect("/");
});
app.get("/education", (req, res) => {
    res.render("education", { Books })
})
app.get("/recipe", (req, res) => {
    res.render("recipe", { Books })
})
app.get("/History", (req, res) => {
    res.render("History", { Books })
})
app.get("/Fantasy", (req, res) => {
    res.render("Fantasy", { Books })
})
app.get("/random", (req, res) => {
    res.render("random", { Books })

})
app.get('/home', (req, res) => {
    res.redirect('/')
})



app.listen(port, (err) => {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server started on port number " + port);
    }
});
