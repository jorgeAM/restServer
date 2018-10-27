const express = require('express');
const Producto = require('../models/producto');
const isAuthenticate = require('../middlewares/authentication');

const app = express.Router();

app.get('/productos', isAuthenticate, async (req, res) => {
  try {
    const productos = await Producto.find().populate('usuario categoria');
    res.status(200).json({ productos });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get('/producto/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario categoria');
    if (!producto) return res.status(404).json({
      message: `Producto con id ${id} no encontrado`,
    });
    res.status(200).json({ producto });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post('/producto', isAuthenticate, async (req, res) => {
  try {
    const { body } = req;
    const nuevoProducto = new Producto();
    nuevoProducto.nombre = body.nombre;
    nuevoProducto.precioUni = body.precioUni;
    nuevoProducto.descripcion = body.descripcion || '-';
    nuevoProducto.categoria = body.categoria;
    nuevoProducto.usuario = req.user.sub;
    const producto = await nuevoProducto.save();
    res.status(200).json({ producto });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.put('/producto/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const producto = await Producto.findByIdAndUpdate(id, body, { new: true });
    if (!producto) return res.status(404).json({
      message: `Producto con id ${id} no encontrado`,
    });
    res.status(200).json({ producto });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.delete('/producto/:id', isAuthenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) return res.status(404).json({
      message: `Producto con id ${id} no encontrado`,
    });
    res.status(200).json({ producto });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = app;
