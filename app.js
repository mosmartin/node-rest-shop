const express = require('express');
const productRoutes = require('./api/routes/products');

const app = express();

// middleware
app.use('/products', productRoutes);

module.exports = app;