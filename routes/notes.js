const notes = require('express').Router();
const { readFromFile, readAndWriteFile, deleteFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a new note`);
  console.log(req.body);

  const {title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndWriteFile(newNote, './db/db.json');
    console.info(`New Note Added Successfully`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  } else {
    res.error('Im sorry, we are not able to add your Note at this time');
  }
});

notes.delete('/:note_id', (req, res) => {
  const ID = req.params.note_id
  deleteFile('./db/db.json', ID)
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

})

module.exports = notes;
