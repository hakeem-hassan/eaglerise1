// /routes/stock.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your stock API URL
const API_URL = 'YOUR_STOCK_API_URL_HERE'; // e.g., 'https://api.example.com/stock'

router.get('/api/stock-prices', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        res.status(500).send('Error fetching stock prices');
    }
});

module.exports = router;
