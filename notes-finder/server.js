    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const app = express();
    const port = 3000;
    const notesPath = path.join(__dirname, 'notes.json');
    app.use(express.json()); // middlware to give req.body its value
    app.get('/notes', (req,res) => {
        fs.readFile(notesPath,'utf8', (err, data)=> {
            if(err) return res.status(500).send('Error finding notes');
            else return res.json(JSON.parse(data));
        });
    });
    app.post('/notes', (req,res) => {
        const newNote = req.body; 
        fs.readFile(notesPath, 'utf8', (err,data) => {
            if(err) return res.status(500).send('Error posting the note'); //readfile fails
            else {
                const oldNotes = JSON.parse(data); //parse the notes json
                let lastId = 0;
                if(oldNotes.length !== 0)
                    lastId = oldNotes[oldNotes.length - 1].id;
                // assigning last ID
                if(typeof newNote.title === 'string' && typeof newNote.content === 'string' && newNote.title.trim() !== "" && newNote.content.trim() !== "") {
                    newNote.createdAt = Date.now();
                    newNote.id = lastId + 1;
                    oldNotes[oldNotes.length] = newNote;
                    fs.writeFile(notesPath, JSON.stringify(oldNotes),(err) => {
                        if(err) {
                            return res.status(500).send("server failed"); // writing to file again
                        } else {
                            return res.status(201).json(oldNotes);
                        }
                    });
                } else {
                    return res.status(400).send('You didn\'t fill all fields');
                }
            }
        });
    });
    app.delete('/notes/:id',(req,res) => {
            fs.readFile(notesPath,'utf8',(err,data) => {
                if(err) return res.status(500).send('Not able to find notes folder');
                else if(!Number.isNaN(Number(req.params.id))){
                    let oldNotes = JSON.parse(data);
                    const nodeToBeDeleted = oldNotes.findIndex(element => element.id === Number(req.params.id));
                    if(nodeToBeDeleted === -1) {
                        return res.status(404).send("Resource Not Found");
                    } else {
                        oldNotes.splice(nodeToBeDeleted,1);
                        fs.writeFile(notesPath,JSON.stringify(oldNotes),(err) => {
                            if(err) {
                                return res.status(500).send("server failed");
                            } else {
                                return res.status(200).send('Note is deleted');
                            }
                        });
                    }
                    }
            });
    });
    app.listen(port);
