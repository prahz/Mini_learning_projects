const express = require('express');
const port = 3000;
const app = express();

const notesRouter = require('./routes/notes.routes.js');

app.use(express.json()); // middlware to give req.body its value
app.use('/notes', notesRouter);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});