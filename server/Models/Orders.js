const mongoose = require('mongoose');

// schema
const orderSchema = mongoose.Schema({},{strict:false});

// model
const Order = mongoose.model('Order',orderSchema);

module.exports = Order