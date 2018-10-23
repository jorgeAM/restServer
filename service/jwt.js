const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client(process.env.CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

  const payload = ticket.getPayload();
  return {
    nombre: payload.name,
    email: payload.email,
    avatar: payload.picture,
    google: true,
  };
};

const encodeToken = (usuario) => {
  let payload = {
    role: usuario.role,
    google: usuario.google,
    estado: usuario.estado,
    sub: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    avatar: usuario.avatar,
  };
  return jwt.sign(payload, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
};

module.exports = {
  verifyGoogleToken,
  encodeToken,
};
