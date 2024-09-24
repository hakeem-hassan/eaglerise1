// /models/Portfolio.js

const mongoose = require('mongoose');

// Portfolio schema
const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // User reference
    stocks: [
        {
            symbol: { type: String, required: true },   // Stock symbol, e.g., AAPL, TSLA
            quantity: { type: Number, required: true }, // Number of shares owned
            purchasePrice: { type: Number, required: true }, // Price at which stock was purchased
            datePurchased: { type: Date, default: Date.now } // Purchase date
        }
    ]
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
