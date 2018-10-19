require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo 🚀 en el puerto ${process.env.PORT}!`);
});
