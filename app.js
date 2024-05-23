const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dailyCollectionJob = require('./jobs/dailyCollectionJob');
const dotenv = require('dotenv');
const { decryptRequest, encryptResponse } = require('./middlewares/encryptionMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Apply decryption middleware to all incoming requests
app.use(decryptRequest);

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

// Apply encryption middleware to all outgoing responses
app.use(encryptResponse);

// Start cron job
dailyCollectionJob.start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
