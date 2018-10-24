const express = require('express');
/*RUTAS*/
const userRoutes = require('./usuario');
const loginRoutes = require('./login');
const categoryRoutes = require('./categoria');

const app = express();

app.use(userRoutes);
app.use(loginRoutes);
app.use(categoryRoutes);

module.exports = app;
