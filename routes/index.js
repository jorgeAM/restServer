const express = require('express');
/*RUTAS*/
const userRoutes = require('./usuario');
const loginRoutes = require('./login');
const categoryRoutes = require('./categoria');
const productRoutes = require('./producto');

const app = express();

app.use(userRoutes);
app.use(loginRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

module.exports = app;
