const fs = require('fs');
const path = './data/filmes.json';

const lerFilmes = () => JSON.parse(fs.readFileSync(path));
const salvarFilmes = (filmes) => fs.writeFileSync(path, JSON.stringify(filmes, null, 2));

// Listar todos os filmes
const listarFilmes = (req, res) => {
  res.json(lerFilmes());
};

// Criar novo filme
const criarFilme = (req, res) => {
  const filmes = lerFilmes();
  const novo = { id: Date.now(), ...req.body };
  filmes.push(novo);
  salvarFilmes(filmes);
  res.status(201).json(novo);
};

// Atualizar filme por ID
const atualizarFilme = (req, res) => {
  const { id } = req.params;
  const filmes = lerFilmes();
  const index = filmes.findIndex(f => f.id == id);

  if (index !== -1) {
    filmes[index] = { ...filmes[index], ...req.body };
    salvarFilmes(filmes);
    res.json(filmes[index]);
  } else {
    res.status(404).json({ mensagem: 'Filme não encontrado' });
  }
};

// Deletar filme por ID
const deletarFilme = (req, res) => {
  const { id } = req.params;
  let filmes = lerFilmes();
  const filme = filmes.find(f => f.id == id);

  if (filme) {
    filmes = filmes.filter(f => f.id != id);
    salvarFilmes(filmes);
    res.json({ mensagem: 'Filme removido' });
  } else {
    res.status(404).json({ mensagem: 'Filme não encontrado' });
  }
};

// Favoritar ou desfavoritar filme
const favoritarFilme = (req, res) => {
  const { id } = req.params;
  const { favorito } = req.body;
  const filmes = lerFilmes();

  const index = filmes.findIndex(f => f.id == id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Filme não encontrado' });
  }

  filmes[index].favorito =
    typeof favorito === 'boolean' ? favorito : !filmes[index].favorito;

  salvarFilmes(filmes);
  res.json(filmes[index]);
};

// Listar somente os favoritos
const listarFavoritos = (req, res) => {
  const filmes = lerFilmes();
  const favoritos = filmes.filter(filme => filme.favorito === true);
  res.json(favoritos);
};

module.exports = {
  listarFilmes,
  criarFilme,
  atualizarFilme,
  deletarFilme,
  favoritarFilme,
  listarFavoritos
};