const http = require('http');
const path = require('path');
const    server = http.createServer((req,res) => {
    res.write('hello world');
    res.end();
    console.log(req.method);
    console.log(req.url);
});
server.listen(3000);
 
