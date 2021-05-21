//express for handling request
const express = require('express');

const app = express(); //running the express

const productRoutes = require('./api/routes/products');

app.use('/products', productRoutes);

module.exports = app;