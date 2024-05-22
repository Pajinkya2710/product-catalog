// controllers/orderController.js
const Order = require('../models/Order');
const Purchase = require('../models/Purchase');
const { OrderLog } = require('../models/Logs');

exports.insertOrder = async (req, res) => {
    try {
      const { orders } = req.body;
      const purchase = new Purchase({ orders: [], totalCost: 0 });
  
      const savedOrders = [];
      for (let orderData of orders) {
        const order = new Order(orderData);
        await order.save();
        purchase.orders.push(order._id);
        purchase.totalCost += order.totalCost;
        savedOrders.push(order); // Collect saved orders
      }
  
      await purchase.save();
      res.status(201).json({ purchaseId: purchase._id, orders: savedOrders });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      // Convert order to plain object and remove _id field
      const orderData = order.toObject();
      delete orderData._id;
  
      const orderLog = new OrderLog(orderData);
      await orderLog.save();
  
      await order.deleteOne(); // Use deleteOne instead of remove
      res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const orderLog = new OrderLog(order.toObject());
    await orderLog.save();

    Object.assign(order, req.body);
    await order.save();

    res.status(200).json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderList = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDailyCollection = async (req, res) => {
  try {
    const dailyCollection = await Order.aggregate([
      { $match: { dateOfPurchase: { $gte: new Date(new Date().setHours(0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59)) } } },
      { $group: { _id: null, total: { $sum: '$totalCost' } } }
    ]);
    res.status(200).json({ total: dailyCollection[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
