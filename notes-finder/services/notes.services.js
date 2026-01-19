const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, '../data/notes.json');

const readNotes = () => {
    return new Promise((resolve,reject) => {
        fs.readFile(notesPath,'utf8', (err, data)=> {
            if(err) reject(err);
            else resolve(JSON.parse(data));
        })
    });
}
const writeNotes = () => {
    return new Promise((resolve,reject) => {
        fs.writeFile(notesPath, JSON.stringify(oldNotes), (err) => {
            if(err) reject(err);
            else resolve(null);
        })
    });
}
module.exports = {readNotes, writeNotes};