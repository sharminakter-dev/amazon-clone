const mongoose = require('mongoose');

// schema
const productSchema = mongoose.Schema({},{strict:false});

// model
const Product = mongoose.model('Product',productSchema);

module.exports = Product;