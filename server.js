const express = require('express');
const path = require ('path');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Express get api data
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, buffer) => {
    const data = JSON.parse(buffer);
    res.send(data);
  });
});

// Express post api data & give new notes a unique id
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, buffer) => {
    const data = JSON.parse(buffer);
    const note = req.body;
    const id = uuid.v4();
    const newNote = {...note, id};
    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.send(newNote);
  });
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});