const express = require('express');
const router = express.Router();

const {
  listarFilmes,
  criarFilme,
  atualizarFilme,
  deletarFilme,
  favoritarFilme,
  listarFavoritos
} = require('../controllers/filmesController'); // caminho relativo correto e nome exato do arquivo

router.get('/favoritos', listarFavoritos);
router.get('/', listarFilmes);
router.post('/', criarFilme);
router.put('/:id', atualizarFilme);
router.delete('/:id', deletarFilme);
router.patch('/:id/favoritar', favoritarFilme);

module.exports = router;