const bcrypt = require('bcrypt');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const usuariosPath = './usuarios.json'; // Caminho do arquivo de usuários

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));

  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

  if (usuarioEncontrado) {
    // Comparar a senha fornecida com a senha criptografada
    bcrypt.compare(senha, usuarioEncontrado.senha, (err, resultado) => {
      if (resultado) {
        // Sucesso no login
        return res.redirect('/views/menu-inicial.html');
      } else {
        // Falha na autenticação
        return res.status(401).send('<h2>Usuário ou senha inválidos</h2><a href="/views/login.html">Voltar</a>');
      }
    });
  } else {
    // Usuário não encontrado
    return res.status(401).send('<h2>Usuário ou senha inválidos</h2><a href="/views/login.html">Voltar</a>');
  }
});

module.exports = router;