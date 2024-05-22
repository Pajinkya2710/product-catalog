
const express = require('express');
const {
  insertOrder,
  deleteOrder,
  updateOrder,
  getOrderList,
  getOrderById,
  getDailyCollection
} = require('../controllers/orderController');
const router = express.Router();

router.post('/order', insertOrder);
router.delete('/order/:id', deleteOrder);
router.put('/order/:id', updateOrder);
router.get('/orders', getOrderList);
router.get('/order/:id', getOrderById);
router.get('/daily-collection', getDailyCollection);

module.exports = router;
