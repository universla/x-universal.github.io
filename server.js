
// server.js
import express from 'express';
import path from 'path';
import { lowdb } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const app = express();
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// Inicializar base de datos
db.defaults({ users: [], posts: [] }).write();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas estáticas
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// API: Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.get('users').find({ username }).value();
  if (user && user.password === password) {
    res.json({ success: true, username });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

// API: Registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (db.get('users').find({ username }).value()) {
    return res.status(400).json({ success: false, message: 'Usuario ya existe' });
  }
  db.get('users').push({ username, password }).write();
  res.json({ success: true });
});

// API: Publicaciones
app.get('/posts', (req, res) => {
  res.json(db.get('posts').value());
});
app.post('/post', (req, res) => {
  const { content, user } = req.body;
  db.get('posts').push({ content, user }).write();
  res.json({ success: true });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
