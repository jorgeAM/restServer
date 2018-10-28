const express = require('express');
/*RUTAS*/
const userRoutes = require('./usuario');
const loginRoutes = require('./login');
const categoryRoutes = require('./categoria');
const productRoutes = require('./producto');
const uploadRoutes = require('./upload');
const imageRoutes = require('./imagenes');

const app = express();

app.use(userRoutes);
app.use(loginRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(uploadRoutes);
app.use(imageRoutes);

module.exports = app;
