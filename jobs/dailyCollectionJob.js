// jobs/dailyCollectionJob.js
const cron = require('cron');
const Order = require('../models/Order');

const job = new cron.CronJob('0 0 * * *', async () => {
  try {
    const dailyCollection = await Order.aggregate([
      { $match: { dateOfPurchase: { $gte: new Date(new Date().setHours(0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59)) } } },
      { $group: { _id: null, total: { $sum: '$totalCost' } } }
    ]);
    console.log('Daily Collection: ', dailyCollection);
  } catch (err) {
    console.error('Error calculating daily collection: ', err.message);
  }
});

module.exports = job;
