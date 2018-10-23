const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const isAuthenticate = require('../middlewares/authentication');

const app = express.Router();

app.get('/usuarios', isAuthenticate, (req, res) => {
  Usuario.find({}, 'nombre email role estado google avatar', (err, usuarios) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ usuarios });
  });
});

app.post('/usuario', (req, res) => {
  const { body } = req;
  let usuario = new Usuario();
  usuario.nombre = body.nombre;
  usuario.email = body.email;
  usuario.password = bcrypt.hashSync(body.password, 10);
  usuario.save((err, usuario) => {
    if (err) return res.status(400).json(err);
    res.status(201).send({ usuario });
  });
});

app.put('/usuario/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    delete body.password;
    delete body.google;
    if (req.user.sub === id) {
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
      );
      if (!usuario) return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
      res.status(200).send({ usuario });
    }else {
      res.status(200).send({ message: 'No puedes modificar un usuario que no sea el tuyo' });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete('/usuario/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    if (!usuario) return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    res.status(200).send({ usuario });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = app;
