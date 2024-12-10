const express = require("express");
let students = [];

const port = 1008;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("index", { students });
});

app.post("/adddata", (req, res) => {
    req.body.id = String(Date.now())
    students.push(req.body);
    res.redirect("/");
});

app.get("/deletedata", (req, res) => {
    const deleteid = String(req.query.id);
    students = students.filter((el) => el.id !== deleteid);
    res.redirect("/");
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server started on port number " + port);
    }
});
