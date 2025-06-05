import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import verificarLogin from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/menu-inicial', verificarLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/menu-inicial.html'));
});

router.get('/dashboard', verificarLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

router.get('/recursos', verificarLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/recursos.html'));
});

export default router;