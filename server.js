const express = require('express');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Inicializar db
db.defaults({ users: [], posts: [] }).write();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para crear usuario
app.post('/signup', (req, res) => {
  const { username } = req.body;
  db.get('users').push({ username }).write();
  res.redirect('/');
});

// Ruta para crear publicación
app.post('/post', (req, res) => {
  const { content, user } = req.body;
  db.get('posts').push({ content, user }).write();
  res.redirect('/');
});

// Ruta para obtener publicaciones
app.get('/posts', (req, res) => {
  res.json(db.get('posts').value());
});

const listener = app.listen(process.env.PORT, () => {
  console.log('App escuchando en puerto ' + listener.address().port);
});
