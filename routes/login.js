const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const service = require('../service/jwt');

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
      let token = service.encodeToken(usuario);
      res.status(200).send({ token, usuario });
    }else res.status(400).send({ message: 'Contraseña incorrecta' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post('/google', async (req, res) => {
  try {
    const token = req.body.idToken;
    const usuarioGoogle = await service.verifyGoogleToken(token);
    let usuarioDB = await Usuario.findOne({ email: usuarioGoogle.email });
    if (usuarioDB) {
      if (usuarioDB.google === false) return res.status(400).json({
        message: 'Usa la autenticación normal',
      });
      else {
        let token = service.encodeToken(usuarioDB);
        return res.status(200).send({ token, usuario: usuarioDB });
      }
    }else {
      let newUser = new Usuario();
      newUser.nombre = usuarioGoogle.nombre;
      newUser.email = usuarioGoogle.email;
      newUser.avatar = usuarioGoogle.avatar;
      newUser.google = usuarioGoogle.google;
      newUser.password = ':)';
      const usuario = await newUser.save();
      let token = service.encodeToken(usuario);
      res.status(200).send({ token, usuario });
    }
  } catch (err) {
    return res.status(403).json({ err });
  }
});

module.exports = app;
