// app.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Importa as rotas
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const filmesRoutes = require('./routes/filmes');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/filmes', filmesRoutes);

module.exports = app;  // exporta o app para ser usado no server.js


//npm install cors
//node server.js
