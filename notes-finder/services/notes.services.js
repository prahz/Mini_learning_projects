const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, '../data/notes.json');

const readNotes = (callback) => {
    fs.readFile(notesPath,'utf8', (err, data)=> {
        if(err) return callback(err);
        callback(null,JSON.parse(data));
    });
}
const writeNotes = (oldNotes,callback) => {
    fs.writeFile(notesPath, JSON.stringify(oldNotes), (err) => {
        if(err) return callback(err);
        callback(null);
    });
}
module.exports = {readNotes, writeNotes};