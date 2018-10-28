const fs = require('fs');
const path = require('path');
const express = require('express');
const isAuthenticate = require('../middlewares/authentication');

const app = express.Router();

app.get('/:tipo/:img', (req, res) => {
  const { tipo, img } = req.params;
  const ruta = path.resolve(__dirname, `../uploads/${tipo}/${fileName}`);
  fs.stat(ruta, (err, stats) => {
    if (err) res.status(500).send({ err });
    res.sendFile(path.resolve(ruta));
  });
});

module.exports = app;
