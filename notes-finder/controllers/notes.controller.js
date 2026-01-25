
const {
    createNote,
    updateNote,
    deleteNote,
    getOneNote,
    getAllNotes
} = require('../services/notes.services');
const getANote = async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const note = await getOneNote(id);      
        if(note == null) return res.status(404).send("Error 404 Not found");       
        return res.json(note);                   
    } catch (err) {
        next(err);
    }
};
const getNotes = async (req, res, next) => {    
    try {
        const notes = await getAllNotes();           
        return res.json(notes);                   
    } catch (err) {
        next(err);
    }
};

const create_Note = async (req, res, next) => {
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
        const num = await createNote(title,content);  
        res.status(201).send({"id" : num});  
    } catch (err) {
        next(err);
    }
};

const delNote = async (req, res, next) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const affectedRows = await deleteNote(id);
        if(affectedRows !== 0) res.status(204).send("Note deleted successfully");
        else res.status(404).send("404 Note Not Found");
    } catch (err) {
        next(err);
    }
};


const update_Note = async (req, res, next) => {
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
        const affectedRows = await updateNote(title,content,id);
        if(affectedRows !== 0) res.status(200).send("Note updated successfully");
        else res.status(404).send("404 Note Not Found");
    } catch (err) {
        next(err);
    }
};
module.exports = {
    getANote,
    getNotes,
    create_Note,
    delNote,
    update_Note
};
