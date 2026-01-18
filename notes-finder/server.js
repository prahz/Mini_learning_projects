const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const notesPath = path.join(__dirname, 'notes.json');
app.use(express.json());
app.get('/notes', (req,res) => {
    fs.readFile(notesPath,'utf8', (err, data)=> {
        if(err) res.status(500).send('Error receiving notes');
        else res.json(JSON.parse(data));
    });
});
app.post('/notes', (req,res) => {
    const noteToBeAdded = req.body;
    fs.readFile(notesPath, 'utf8', (err,data) => {
        if(err) res.status(500).send('Error posting the note');
        else {
            const oldNotes = JSON.parse(data);
            lastId = oldNotes.length;
            if(noteToBeAdded.title !== "" && noteToBeAdded.content !== "") {
                noteToBeAdded.createdAt = Date.now();
                noteToBeAdded.id = lastId;
                oldNotes[oldNotes.length] = noteToBeAdded;
                fs.writeFile(notesPath, JSON.stringify(oldNotes),(err) => {
                    if(err) res.statusCode(500).send("server failed");
                    res.end();
                });
                res.status(200).send(JSON.stringify(oldNotes));
            } else {
                res.status(400).send('You didn\'t fill all fields');
            }
        }
    })
});
app.listen(port);
