// Params Used: 
//      notes
//      notesID
//      currentNote

// title, note, note_id

const express = require('express');
const path = require('path');
const api = require('./routes/index')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);

app.use(express.static('public'));

// Get route for Index.html

// Get route for Notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  console.info(`now connecting to the notes.html, please wait`)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
  console.info(`now connecting to the index.html, please wait`)
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
