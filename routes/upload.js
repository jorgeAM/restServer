const moment = require('moment');
const express = require('express');
const fileUpload = require('express-fileupload');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const isAuthenticate = require('../middlewares/authentication');

const app = express.Router();

app.use(fileUpload());

app.post('/upload/:tipo/:id', isAuthenticate, (req, res) => {
  const { tipo, id } = req.params;
  if (!req.files) {
    return res.status(400).json({ message: 'Debes seleccionar una imagen' });
  }

  let tiposValidos = ['productos', 'usuarios'];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ message: 'Tipo invalido' });
  }

  let image = req.files.image;
  if (image.mimetype === 'image/png' || image.mimetype === 'image/jpeg') {
    let extension = image.name.split('.')[1];
    let nombreArchivo = `${moment().unix()}.${extension}`;
    image.mv(`./uploads/${tipo}/${nombreArchivo}`, (err) => {
      if (err) return res.status(400).json({ err });
      return res.status(200).json({ message: 'Imagen subida con exito' });
    });
  } else {
    return res.status(400).json({ message: 'Solo pudes subir archivos PNG o JPG' });
  }
});

module.exports = app;
