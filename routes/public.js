import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const sessao = {};

const caminhoUsuarios = path.join(__dirname, '../dados/usuarios.json');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(caminhoUsuarios));

  const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (encontrado) {
    sessao[usuario] = { autenticado: true, tipo: encontrado.tipo };
    res.redirect(`/menu-inicial?usuario=${usuario}`);
  } else {
    res.send('Usuário ou senha inválido');
  }
});

export default router;