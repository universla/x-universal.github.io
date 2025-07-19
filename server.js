const express = require('express');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Inicializar base de datos
db.defaults({ users: [], posts: [] }).write();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Registro de usuario
app.post('/signup', (req, res) => {
  const { username } = req.body;
  db.get('users').push({ username }).write();
  res.redirect('/');
});

// Crear publicación
app.post('/post', (req, res) => {
  const { content, user } = req.body;
  db.get('posts').push({ content, user }).write();
  res.redirect('/');
});

// Obtener publicaciones
app.get('/posts', (req, res) => {
  res.json(db.get('posts').value());
});

// Iniciar servidor
const listener = app.listen(process.env.PORT, () => {
  console.log('App escuchando en puerto ' + listener.address().port);
});
