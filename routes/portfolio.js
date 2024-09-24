// /routes/portfolio.js

const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Create a new portfolio for a user
router.post('/api/portfolio', async (req, res) => {
    try {
        const portfolio = new Portfolio({
            userId: req.body.userId,
            stocks: req.body.stocks, // Array of stocks
        });
        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create portfolio' });
    }
});

// Fetch a user's portfolio
router.get('/api/portfolio/:userId', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.params.userId });
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching portfolio' });
    }
});

// Update a user's portfolio (e.g., add/remove stocks)
router.put('/api/portfolio/:id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });

        // Example: Add or update a stock in the portfolio
        portfolio.stocks = req.body.stocks;  // Update stocks array
        await portfolio.save();
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update portfolio' });
    }
});

module.exports = router;
