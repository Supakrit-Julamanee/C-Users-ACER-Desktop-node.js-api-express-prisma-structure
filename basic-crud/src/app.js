const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const itemRoutes = require('./routes/itemRoute'); // Import your item routes
const errorHandler = require('./middleware/errorHandler'); // Custom error handling middleware

// Initialize the Express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for logging HTTP requests (e.g., for development)
app.use(morgan('dev'));

// Mount API routes
app.use('/items', itemRoutes);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    code: 404,
    message: 'Route not found',
  });
});

// Error-handling middleware (always comes last)
app.use(errorHandler);

module.exports = app;
