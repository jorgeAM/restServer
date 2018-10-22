const express = require('express');
/*RUTAS*/
const userRoutes = require('./usuario');
const loginRoutes = require('./login');

const app = express();

app.use(userRoutes);
app.use(loginRoutes);

module.exports = app;
