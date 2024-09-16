const TokenPermanente = require('../models/TokenPermanente');

// Middleware para verificar o token permanente no cabeçalho
const authTokenMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Autenticação necessária.' });
  }

  // Verifica o formato do token (espera-se que o token esteja diretamente no cabeçalho)
  const tokenValue = token.split(' ')[1] || token;  // Para caso esteja no formato "Bearer <token>"

  try {
    // Busca o token no banco de dados (TokenPermanente model)
    const tokenPermanente = await TokenPermanente.findOne({ token: tokenValue });

    if (!tokenPermanente) {
      return res.status(401).json({ message: 'Token inválido ou não autorizado.' });
    }

    // Se o token for válido, permite seguir para a próxima função
    req.tokenInfo = tokenPermanente;  // Adiciona as informações do token à requisição
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao validar o token.', error });
  }
};

module.exports = authTokenMiddleware;
