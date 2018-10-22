const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express.Router();

app.post('/login', async (req, res) => {
  try {
    const { body } = req;
    const usuario = await Usuario.findOne({ email: body.email });
    if (!usuario) return res.status(404).json({
      message: `Usuario con email ${body.email} no encontrado`,
    });

    let check = bcrypt.compareSync(body.password, usuario.password);
    if (check) {
      let payload = {
        role: usuario.role,
        google: usuario.google,
        estado: usuario.estado,
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      };
      let token = jwt.sign(payload, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
      res.status(200).send({ token, usuario });
    }else res.status(400).send({ message: 'Contraseña incorrecta' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = app;
