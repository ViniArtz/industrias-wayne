const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.use(session({
  secret: 'segredoWayne',
  resave: false,
  saveUninitialized: true
}));

const estaLogado = (req, res, next) => {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', (req, res) => {
  res.redirect('/menu-inicial');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './views/login.html'));
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  const usuarios = JSON.parse(fs.readFileSync('./data/usuarios.json', 'utf-8'));

  const usuarioEncontrado = usuarios.find(
    u => u.usuario === usuario && u.senha === senha
  );

  if (usuarioEncontrado) {
    req.session.usuario = usuarioEncontrado.usuario;
    res.redirect('/menu-inicial');
  } else {
    res.send(`
      <h2>Usuário ou senha inválidos</h2>
      <a href="/login">Voltar</a>
    `);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/menu-inicial', estaLogado, (req, res) => {
  res.sendFile(path.join(__dirname, './views/menu-inicial.html'));
});

app.get('/dashboard', estaLogado, (req, res) => {
  res.sendFile(path.join(__dirname, './views/dashboard.html'));
});

app.get('/recursos', estaLogado, (req, res) => {
  res.sendFile(path.join(__dirname, './views/recursos.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
