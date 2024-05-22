// controllers/productController.js
const Product = require('../models/Product');
const { ProductLog } = require('../models/Logs');
const Order = require('../models/Order');

exports.insertProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ productId: product._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const orders = await Order.find({ productId: product._id });
    if (orders.length) return res.status(400).json({ message: 'Product has associated orders' });

    // Convert product to plain object and remove _id field
    const productData = product.toObject();
    delete productData._id;

    const productLog = new ProductLog(productData);
    await productLog.save();

    await product.deleteOne(); // Use deleteOne instead of remove
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Convert product to plain object and remove _id field
    const productData = product.toObject();
    delete productData._id;

    const productLog = new ProductLog(productData);
    await productLog.save();

    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
