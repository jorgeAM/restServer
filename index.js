require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

mongoose.connect('mongodb://localhost/cafe', { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error en conexión'));
db.once('open', () => {
  console.log('Conexión correcta');
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo 🚀 en el puerto ${process.env.PORT}!`);
  });
});
