
const express = require('express');
const {
  insertProduct,
  deleteProduct,
  updateProduct,
  getProductList,
  getProductById
} = require('../controllers/productController');
const router = express.Router();

router.post('/product', insertProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);
router.get('/products', getProductList);
router.get('/product/:id', getProductById);

module.exports = router;
