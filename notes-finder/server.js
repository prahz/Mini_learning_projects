const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
app.get('/notes', (req,res) => {
    const notesPath = path.join(__dirname, 'notes.json');
    fs.readFile(notesPath,'utf8', (err, data)=> {
        if(err) res.statusCode(500).send('Error receiving notes');
        else res.json(JSON.parse(data));
    });
});
app.listen(port);
