const { name } = require('ejs');
const express = require('express');
const port = 1008;
const app = express();

app.set('view engine', 'ejs');

const students = [
    {
        'id': '1',
        'name': 'amit',
        'age': '18'
    }, {
        'id': '2',
        'name': 'rahil',
        'age': '18'
    }, {
        'id': '3',
        'name': 'sanjay',
        'age': '20'
    },
    {
        'id': '4',
        'name': 'sushil',
        'age': '18'
    }
]

app.get('/', (req, res) => {
    res.render('index', { students });
});

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});
