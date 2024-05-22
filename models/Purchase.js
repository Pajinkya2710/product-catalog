// models/Purchase.js
const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  totalCost: { type: Number, required: true },
  dateOfPurchase: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
