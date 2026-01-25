const express = require('express');

const router = express.Router();
const {getANote,   
        getNotes,
        update_Note,
        delNote,
        create_Note, 
        } = require('../controllers/notes.controller');
router.get('/', getNotes);
router.get('/:id', getANote)
router.post('/',create_Note);
router.put('/:id',update_Note);
router.delete('/:id',delNote);
module.exports = router;