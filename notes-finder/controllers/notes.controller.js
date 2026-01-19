const { readNotes,writeNotes} = require('../services/notes.services');

const getNotes = async (req,res) => {
        try {
            const data = await readNotes()
            res.json(data);
        } catch {
            res.status(500).send('Error finding notes');
        }
}
const createNote = (req,res) => {
    const newNote = req.body; 
    readNotes((err,data) => {
        if(err) return res.status(500).send('Error posting the note'); //readNotes fails
        else {
            const oldNotes = (data); 
            let lastId = 0;
            if(oldNotes.length !== 0)
                lastId = oldNotes[oldNotes.length - 1].id;
            // assigning last ID
            if(typeof newNote.title === 'string' && typeof newNote.content === 'string' 
                && newNote.title.trim() !== "" && newNote.content.trim() !== "") {
                newNote.createdAt = Date.now();
                newNote.id = lastId + 1;
                oldNotes[oldNotes.length] = newNote;
                writeNotes(oldNotes,(err) => {
                    if(err) {
                        return res.status(500).send("server failed"); 
                    } else {
                        return res.status(201).json(oldNotes);
                    }
                });
            } else {
                return res.status(400).send('You didn\'t fill all fields');
            }
        }
    });
}
const deleteNote = (req,res) => {
        readNotes ((err,data) => {
            if(err) return res.status(500).send('Not able to find notes folder');
            else if(!Number.isNaN(Number(req.params.id))){
                let oldNotes = (data);
                const nodeToBeDeleted = oldNotes.findIndex(element => element.id === Number(req.params.id));
                if(nodeToBeDeleted === -1) {
                    return res.status(404).send("Resource Not Found");
                } else {
                    oldNotes.splice(nodeToBeDeleted,1);
                    writeNotes(oldNotes,(err) => {
                        if(err) {
                            return res.status(500).send("server failed");
                        } else {
                            return res.status(200).send('Note is deleted');
                        }
                    });
                }
            }
        });
}
const updateNote = (req,res) => {
    const updatedNote = req.body; 
    if(Number.isNaN(Number(req.params.id))) return res.status(400).send("client error");
    readNotes((err,data) => {
        if(err) return res.status(500).send('Error updating the note'); //readNotes fails
        else {
            const oldNotes = (data); 
            let indexToUpdate = oldNotes.findIndex((element ) => element.id === Number(req.params.id));
            if(indexToUpdate === -1) return res.status(404).send("Resource not found");
            if(typeof updatedNote.title === 'string' && typeof updatedNote.content === 'string' && 
                updatedNote.title.trim() !== "" && updatedNote.content.trim() !== "") {
                updatedNote.updatedAt = Date.now();
                oldNotes[indexToUpdate].title = updatedNote.title;
                oldNotes[indexToUpdate].content = updatedNote.content;
                oldNotes[indexToUpdate].updatedAt = updatedNote.updatedAt;
                writeNotes(oldNotes,(err) => {
                    if(err) {
                        return res.status(500).send("server failed"); // writing to Notes again
                    } else {
                        return res.status(200).json(oldNotes);
                    }
                });
            } else {
                return res.status(400).send('You didn\'t fill all fields');
            }
        }
    });
}
module.exports = {getNotes,updateNote,deleteNote,createNote};