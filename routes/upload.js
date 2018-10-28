const fs = require('fs');
const moment = require('moment');
const express = require('express');
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const isAuthenticate = require('../middlewares/authentication');

const app = express.Router();

app.use(fileUpload());

app.post('/upload/:tipo/:id', isAuthenticate, async (req, res) => {
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
      else {
        /*DB*/
        uploadImageUser(tipo, id, nombreArchivo, res);
        /*DB*/
      }
    });
  } else {
    return res.status(400).json({ message: 'Solo pudes subir archivos PNG o JPG' });
  }
});

const deleteImage = (tipo, fileName) => {
  let path = `./uploads/${tipo}/${fileName}`;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const uploadImageUser = (tipo, id, nombreArchivo, res) => {
  Usuario.findById(id, (err, usuario) => {
    if (err) {
      deleteImage(tipo, nombreArchivo);
      return res.status(500).json({ err });
    }
    /*SI USUARIO NO EXISTE SE BORRA FOTO */
    if (!usuario) {
      deleteImage(tipo, nombreArchivo);
      return res.status(404).json({ message: 'usuario no existe' });
    }
    /*USUARIO EXISTE SE INTENTA BORRAR FOTO ANTERIOR*/
    if (usuario.avatar) deleteImage(tipo, usuario.avatar);
    /*SE ASIGNA NUEVA FOTO*/
    usuario.avatar = nombreArchivo;
    usuario.save((err, user) => {
      if (err) return res.status(500).json({ err });

      return res.status(200).json({
        message: 'Imagen subida con exito',
        usuario: user,
      });
    });
  });
};

module.exports = app;
