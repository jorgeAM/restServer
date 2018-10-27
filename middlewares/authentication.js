const jwt = require('jsonwebtoken');
const moment = require('moment');

const isAuthenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `Debes autenticarte` });
  }

  let token = req.headers.authorization;
  token = token.replace('Bearer ', '');
  try {
    let payload = jwt.verify(token, process.env.SEED);
    if (moment().unix() > payload.exp) {
      console.log('token extendido');
      return res.status(401).json({ message: `Token ha expirado` });
    }

    req.user = payload;
  } catch (e) {
    return res.status(500).json({ message: `Token inválido` });
  }

  next();
};

module.exports = isAuthenticate;
