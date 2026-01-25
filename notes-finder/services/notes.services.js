const pool = require('./db');

async function createNote (title , content) {
    const sql = "INSERT INTO notes (title,content) VALUES (? ,?) ";
    const [newRow] = await pool.query(sql,[title, content] );
    return newRow.insertId;
}
async function updateNote(title,content,id) {
    const sql = "UPDATE notes SET title = ?, content = ? WHERE id = ?";
    const [updatedRow] = await pool.query(sql, [title,content,id]);
    return updatedRow.affectedRows;
}
async function deleteNote(id) {
    const sql = "DELETE FROM notes WHERE id = ?";
    const [deletedRow] = await pool.query(sql,[id]);
    return deletedRow.affectedRows;
}
async function getOneNote(id) {
    const sql = "SELECT * FROM notes WHERE id = ?";
    const [row] = await pool.query(sql,[id]);
    return row[0] || null;
}
async function getAllNotes() {
    const sql = "SELECT * FROM notes"
    const [rows] = await pool.query(sql);
    return rows;
}
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getOneNote,
    getAllNotes
};