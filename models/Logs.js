const mongoose = require('mongoose');

const productLogSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  loggedAt: {
    type: Date,
    default: Date.now
  }
});

const orderLogSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  totalCost: Number,
  dateOfPurchase: Date,
  loggedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  ProductLog: mongoose.model('ProductLog', productLogSchema),
  OrderLog: mongoose.model('OrderLog', orderLogSchema)
};
