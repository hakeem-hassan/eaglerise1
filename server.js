const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const stockRoutes = require('./routes/stock'); // Import the stock routes
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration (only need to define this once)
app.use(cors({ origin: 'http://localhost:8080' }));

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if the connection fails
  });

// Use the stock routes
app.use(stockRoutes);

// use the Portfolio routes
const portfolioRoutes = require('./routes/portfolio'); // Import portfolio routes
app.use(portfolioRoutes); // Add portfolio routes



// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
  res.send('Eaglerise Backend is Running');
});

// User routes (assuming you have defined userRoutes in another file)
const userRoutes = require('./routes/userRoutes'); // Adjust this to the correct path
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('MongoDB URI:', process.env.MONGO_URI); // Print MongoDB URI for debugging
});
