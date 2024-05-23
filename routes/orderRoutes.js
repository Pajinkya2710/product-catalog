const express = require('express');
const {
  insertOrder,
  deleteOrder,
  updateOrder,
  getOrderList,
  getOrderById,
  getDailyCollection
} = require('../controllers/orderController');
const { decryptRequest, encryptResponse } = require('../middlewares/encryptionMiddleware');
const router = express.Router();

router.post('/order', decryptRequest, insertOrder, encryptResponse);
router.delete('/order/:id', decryptRequest, deleteOrder, encryptResponse);
router.put('/order/:id', decryptRequest, updateOrder, encryptResponse);
router.get('/orders', decryptRequest, getOrderList, encryptResponse);
router.get('/order/:id', decryptRequest, getOrderById, encryptResponse);
router.get('/daily-collection', decryptRequest, getDailyCollection, encryptResponse);

module.exports = router;
