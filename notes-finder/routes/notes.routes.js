const express = require('express');

const router = express.Router();
const {getNotes,updateNote,deleteNote,createNote} = require('../controllers/notes.controller');
router.get('/', getNotes);
router.post('/',createNote);
router.put('/',updateNote);
router.delete('/',deleteNote);
module.exports = router;