const express = require('express');
const Categoria = require('../models/categoria');
const isAuthenticate = require('../middlewares/authentication');

const app = express.Router();

app.get('/categorias', isAuthenticate, async (req, res) => {
  try {
    const categorias = await Categoria.find().populate('usuario', 'nombre email');
    res.status(200).json({ categorias });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get('/categoria/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre email');
    if (!categoria) return res.status(404).json({
      message: `Categoria con id ${id} no encontrado`,
    });
    res.status(200).json({ categoria });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post('/categoria', isAuthenticate, async (req, res) => {
  try {
    const { body } = req;
    const nuevaCategoria = new Categoria();
    nuevaCategoria.descripcion = body.descripcion;
    nuevaCategoria.usuario = req.user.sub;
    const categoria = await nuevaCategoria.save();
    res.status(200).json({ categoria });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.put('/categoria/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const categoria = await Categoria.findByIdAndUpdate(id, body, { new: true });
    if (!categoria) return res.status(404).json({
      message: `Categoria con id ${id} no encontrado`,
    });
    res.status(200).json({ categoria });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.delete('/categoria/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndDelete(id);
    if (!categoria) return res.status(404).json({
      message: `Categoria con id ${id} no encontrado`,
    });
    res.status(200).json({ categoria });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = app;
