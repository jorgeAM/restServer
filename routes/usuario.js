const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const app = express.Router();

app.get('/usuarios', (req, res) => {
  Usuario.find({}, 'nombre email role estado', (err, usuarios) => {
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

app.put('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    delete body.password;
    delete body.google;
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    if (!usuario) return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    res.status(200).send({ usuario });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete('/usuario/:id', async (req, res) => {
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
