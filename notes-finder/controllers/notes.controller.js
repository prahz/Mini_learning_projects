const { readNotes, writeNotes } = require('../services/notes.services');

const getNotes = async (req, res) => {
    try {
        const notes = await readNotes();           
        return res.json(notes);                   
    } catch (err) {
        return res.status(500).send('Error finding notes');
    }
};

const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (
        typeof title !== 'string' ||
        typeof content !== 'string' ||
        title.trim() === '' ||
        content.trim() === ''
    ) {
        return res.status(400).send("You didn't fill all fields");
    }
    try {
        const notes = await readNotes();           
        const lastId = notes.length
            ? notes[notes.length - 1].id
            : 0;
        const newNote = {
            id: lastId + 1,
            title,
            content,
            createdAt: Date.now()
        };
        notes.push(newNote);
        await writeNotes(notes);                   
        return res.status(201).json(newNote);   
    } catch (err) {
        return res.status(500).send('Error posting the note');
    }
};

const deleteNote = async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const notes = await readNotes();           
        const index = notes.findIndex(n => n.id === id);
        if (index === -1) {
            return res.status(404).send('Resource Not Found');
        }
        notes.splice(index, 1);
        await writeNotes(notes);                
        return res.status(200).send('Note is deleted');
    } catch (err) {
        return res.status(500).send('Error deleting note');
    }
};


const updateNote = async (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    if (!Number.isInteger(id)) {
        return res.status(400).send('Invalid ID');
    }
    if (
        typeof title !== 'string' ||
        typeof content !== 'string' ||
        title.trim() === '' ||
        content.trim() === ''
    ) {
        return res.status(400).send("You didn't fill all fields");
    }
    try {
        const notes = await readNotes();           
        const index = notes.findIndex(n => n.id === id);
        if (index === -1) {
            return res.status(404).send('Resource not found');
        }
        notes[index].title = title;
        notes[index].content = content;
        notes[index].updatedAt = Date.now();
        await writeNotes(notes);               
        return res.status(200).json(notes[index]); 
    } catch (err) {
        return res.status(500).send('Error updating the note');
    }
};
module.exports = {
    getNotes,
    createNote,
    deleteNote,
    updateNote
};
