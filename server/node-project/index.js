const http = require('http'); 
const port = 1008;

const portHandler = (req, res) => {
    res.write("<h1>Server started on port </h1>" + port);
    res.end(); 
};

const server = http.createServer(portHandler);

server.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${port}`); 
    }
});