const express = require('express');
const {
  insertProduct,
  deleteProduct,
  updateProduct,
  getProductList,
  getProductById
} = require('../controllers/productController');
const { decryptRequest, encryptResponse } = require('../middlewares/encryptionMiddleware');
const router = express.Router();

router.post('/product', decryptRequest, insertProduct, encryptResponse);
router.delete('/product/:id', decryptRequest, deleteProduct, encryptResponse);
router.put('/product/:id', decryptRequest, updateProduct, encryptResponse);
router.get('/products', decryptRequest, getProductList, encryptResponse);
router.get('/product/:id', decryptRequest, getProductById, encryptResponse);

module.exports = router;
